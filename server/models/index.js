var Sequelize = require('sequelize');
var db = require('../db');
var dbseq = new Sequelize('chat', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

var User = dbseq.define('Users', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: Sequelize.STRING
});

var Room = dbseq.define('Rooms', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  roomname: Sequelize.STRING
});

var Message = dbseq.define('Messages', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  text: Sequelize.STRING
});

Message.belongsTo(User);
Message.belongsTo(Room);
Message.sync();



module.exports = {
  messages: {
    get: function (q, cb) {

      // var queryString = 'SELECT message as text, username, roomname FROM messages m, users u, rooms r ' +
      // 'Where m.roomid=r.roomid AND m.userid = u.userid';
      if (q.query.data && JSON.parse(q.query.data).where) {
        var where = JSON.parse(q.query.data).where;
        Message.sync()
          .then(()=> {
            return Message.findAll({where: where,
              attributes: {
                include: [[Sequelize.literal('User.username'), 'username'], [Sequelize.literal('Room.roomname'), 'roomname']],
              },
              include: [{model: User}, {model: Room}]
            });
          })
          .then((results)=>{
            cb({results: results});
          });
      } else {
        Message.sync()
          .then(()=> {
            return Message.findAll({attributes: {
              include: [[Sequelize.literal('User.username'), 'username'], [Sequelize.literal('Room.roomname'), 'roomname']],
            },
            include: [{model: User}, {model: Room}]});
          })
          .then((results)=>{
            cb({results: results});
          });
      }
    }, // a function which produces all the messages

    post: function (message, cb) {
      var usertoAdd; var roomtoAdd;
      User.findOne({
        where: {username: message.username.toUpperCase()}
      }).then(theUser => {
        if (theUser) {
          usertoAdd = theUser;
          return Room.findOne({
            where: {roomname: message.roomname.toUpperCase()}
          });
        } else {
          return User.create({
            username: message.username.toUpperCase()
          }).then(theUser => {
            usertoAdd = theUser;
            return Room.findOne({
              where: {roomname: message.roomname.toUpperCase()}
            });
          });
        }

      }).then(theRoom => {
        if (theRoom) {
          roomtoAdd = theRoom;
          Message.create({
            text: message.text,
            RoomId: roomtoAdd.id,
            UserId: usertoAdd.id
          }).then(()=> {
            console.log('message posted');
            cb('succesffuly posted message');
          });
        } else {
          Room.create({
            roomname: message.roomname.toUpperCase()
          }).then(theRoom => {
            roomtoAdd = theRoom;
            Message.create({
              text: message.text,
              RoomId: roomtoAdd.id,
              UserId: usertoAdd.id
            }).then(()=> {
              console.log('message posted');
              cb('succesffuly posted message');
            });

          });
        }
      }).catch((err)=>{
        console.log(err);
        if (err) { cb (err); }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (q, cb) {

      if (q.query.data && JSON.parse(q.query.data).where) {
        var where = JSON.parse(q.query.data).where;
        User.sync()
          .then(()=> {
            return User.findAll({where: where});
          })
          .then((results)=>{
            cb({results: results});
          });
      } else {
        User.sync()
          .then(()=> {
            User.findAll()
              .then((results)=>{
                cb({results: results});
              });
          });
      }
    },
    post: function (username, cb) {
      User.findOne({
        username: username.toUpperCase()
      }). then(theUser => {
        if (!theUser) {
          User.create({
            username: username.toUpperCase()
          });
          cb('Sucess');
        } else {
          cb('Alread Exists');
        }
      }).catch((err)=> {
        if (err) {
          cb(err);
        }
      });
    }
  },
  rooms: {
    // Ditto as above.
    get: function (q, cb) {
      if (q.query.data && JSON.parse(q.query.data).where) {
        var where = JSON.parse(q.query.data).where;
        Room.sync()
          .then(()=> {
            return Room.findAll({where: where});
          })
          .then((results)=>{
            cb({results: results});
          });
      } else {
        User.sync()
          .then(()=> {
            User.findAll()
              .then((results)=>{
                cb({results: results});
              });
          });
      }
    },
    post: function (roomname, cb) {
      Room.findOne({
        roomname: roomname.toUpperCase()
      }). then(theRoom => {
        if (!theRoom) {
          Room.create({
            roomname: roomname.toUpperCase()
          });
          cb('Sucess');
        } else {
          cb('Alread Exists');
        }
      }).catch((err)=> {
        if (err) {
          cb(err);
        }
      });
    }
  }
};


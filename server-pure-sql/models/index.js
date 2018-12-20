var db = require('../db');

module.exports = {
  messages: {
    get: function (q, cb) {

      var queryString = 'SELECT message as text, username, roomname FROM messages m, users u, rooms r ' +
      'Where m.roomid=r.roomid AND m.userid = u.userid';
      if (q.query.data && JSON.parse(q.query.data).where) {
        var where = JSON.parse(q.query.data).where;
        queryString += ` AND r.roomname = "${where.room}";`;
      } else {
        queryString += ';';
      }
      console.log(queryString);
      db.dbConnection.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          cb(null);
        } else {
          cb({results: results});
        }
      });
    }, // a function which produces all the messages

    post: function (message, cb) {
      var queryString = 'INSERT INTO messages (message, roomid, userid) VALUES ("' + message.text + '", ';
      if (message.roomid) {
        queryString += message.roomid + ', ';
        if (message.userid) {
          queryString += message.userid + ');';
          db.dbConnection.query(queryString, (err, results) => {
            if (err) {
              console.log(err);
              cb(null);
            } else {
              cb('Message Posted');
            }
          });
        } else {
          this.getUserId(message.username, (userId) => {
            queryString += userId + ');';
            db.dbConnection.query(queryString, (err, results) => {
              if (err) {
                console.log(err);
                cb(null);
              } else {
                cb('Message Posted');
              }
            });
          });
        }
      } else {
        this.getRoomId(message.roomname, (roomId) => {
          queryString += roomId + ', ';
          if (message.userid) {
            queryString += message.userid + ');';
            db.dbConnection.query(queryString, (err, results) => {
              if (err) {
                console.log(err);
                cb(null);
              } else {
                cb('Message Posted');
              }
            });
          } else {
            this.getUserId(message.username, (userId) => {
              queryString += userId + ');';
              console.log(queryString);
              db.dbConnection.query(queryString, (err, results) => {
                if (err) {
                  console.log(err);
                  cb(null);
                } else {
                  cb('Message Posted');
                }
              });
            });
          }

        });
      }
    }, // a function which can be used to insert a message into the database
    getUserId: function (username, cb) {
      var queryString = `Select userid from users where username = "${username}";`;
      db.dbConnection.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          cb(null);
        } else {
          if (results[0]) {
            cb(results[0].userid);
          } else {
            queryString = `INSERT INTO users (username) VALUES ("${username}");`;
            db.dbConnection.query(queryString, (err, results) => {
              if (err) {
                console.log(err);
                cb(null);
              } else {
                this.getUserId(username, cb);
              }
            });
          }
        }
      });
    }, //a function that gets a userid based on a name or inserts one
    getRoomId: function (roomname, cb) {
      var queryString = `Select roomid from rooms where roomname = "${roomname}";`;
      db.dbConnection.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          cb(null);
        } else {
          if (results[0]) {
            cb(results[0].roomid);
          } else {
            queryString = `INSERT INTO rooms (roomname) VALUES ("${roomname}");`;
            db.dbConnection.query(queryString, (err, results) => {
              if (err) {
                console.log(err);
                cb(null);
              } else {
                this.getRoomId(roomname, cb);
              }
            });
          }
        }
      });
    } //a function that gets a roomid based on a name or inserts one
  },

  users: {
    // Ditto as above.
    get: function (q, cb) {
      var queryString = 'SELECT userid, username FROM users';
      if (q.query.data && JSON.parse(q.query.data).where) {
        var where = JSON.parse(q.query.data).where;
        queryString += ` AND username = "${where.username}";`;
      } else {
        queryString += ';';
      }
      console.log(queryString);
      db.dbConnection.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          cb(null);
        } else {
          cb({results: results});
        }
      });
    },
    post: function (username, cb) {
      var queryString = 'INSERT INTO users (username) VALUES ("' + username + '");';
      db.dbConnection.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          cb('Error');
        } else {
          cb('Sucess');
        }
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


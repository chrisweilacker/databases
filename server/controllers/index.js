var models = require('../models');
var url = require('url');

module.exports = {
  messages: {
    get: function (req, res) {
      res.type('application/json');
      var q = url.parse(req.url, true);
      models.messages.get(q, (results) => {
        res.send(JSON.stringify(results));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // You will need to change this if you are sending something
      // other than plain text, like JSON or HTML.
      //headers['Content-Type'] = 'application/json';
      console.log('Inside Post Function');
      res.type('plain/text');
      //response.writeHead(statusCode, headers);
      // .writeHead() writes to the request line and headers of the response,
      // which includes the status and all headers.



      var message = req.body;
      console.log('Message Recieved', message);
      if (!message.roomname) {
        message.room = "All";
        message.roomid = 1;
      }
      if (!message.username) {
        message.username = "Anon";
        message.userid = 1;
      }
      models.messages.post(message, (response)=>{
        console.log('message supposedly posted')
        res.send(response);
      });


    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.type('application/json');
      var q = url.parse(req.url, true);
      models.users.get(q, (results) => {
        res.send(JSON.stringify(results));
      });
    },
    post: function (req, res) {
      res.type('plain/text');
      console.log('Adding Username:', req.body.username);
      models.users.post(req.body.username, (results) => {
        res.send(results);
      });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  },
};


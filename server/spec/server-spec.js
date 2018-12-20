/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'password',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages;';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO messages (text, userid, roomid) VALUES (\'Men like you can never change!\',1,1)';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog.results[0].text).to.equal('Men like you can never change!');
        expect(messageLog.results[0].roomname).to.equal('ALL');
        done();
      });
    });
  });

  it('Should output users from the DB', function(done) {
    request('http://127.0.0.1:3000/classes/users', function(error, response, body) {
      var users = JSON.parse(body);
      expect(users.results[0].username).to.equal('ANON');
      expect(users.results[2].username).to.equal('VALJEAN');
      done();
    });
  });

  it('Should output rooms from the DB', function(done) {
    request('http://127.0.0.1:3000/classes/rooms', function(error, response, body) {
      var rooms = JSON.parse(body);
      expect(rooms.results[0].roomname).to.equal('ALL');
      expect(rooms.results[2].roomname).to.equal('HELLO');
      done();
    });
  });

  it('Should insert a room into the DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/rooms',
      json: { roomname: 'MYROOM' }
      }, function () {
      request('http://127.0.0.1:3000/classes/rooms', function(error, response, body) {
        var rooms = JSON.parse(body);
        expect(rooms.results[rooms.results.length-1].roomname).to.equal('MYROOM');
        done();
      });
    });
  });
});

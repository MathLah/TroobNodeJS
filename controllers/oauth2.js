// Load required packages
var oauth2orize = require('oauth2orize')
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var RefreshToken = require('../models/refreshToken');
var Code = require('../models/code');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient(function(client, callback) {
  return callback(null, client._id);
});

server.deserializeClient(function(id, callback) {
  Client.findOne({ _id: id }, function (err, client) {
    if (err) {
      return callback(err);
    }
    return callback(null, client);
  });
});

// Exchange authorization codes for access tokens.  The callback accepts the
// `client`, which is exchanging `code` and any `redirectUri` from the
// authorization request for verification.  If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, function (err, res) {
            if (!res) {
              return done(null, false);
            }

            var token = uid(256);
            var refreshToken = uid(256);
            var tokenHash = crypto.createHash('sha1').update(token).digest('hex');
            var refreshTokenHash = crypto.createHash('sha1').update(refreshToken).digest('hex');

            var expirationDate = new Date(new Date().getTime() + (3600 * 1000));

            var token = new Token({
              token: tokenHash,
              expirationDate: expirationDate,
              clientId: client.id,
              userId: username,
              scope: scope
            });

            token.save(function (err) {
                if (err) {
                  return done(err);
                }

                var refreshToken = new RefreshToken({
                  refreshToken: refreshTokenHash,
                  clientId: client.id,
                  userId: username
                });

                refreshToken.save(function (err) {
                    if (err) {
                      return done(err);
                    }
                    done(null, token, refreshToken, {expires_in: expirationDate});
                });
            });
        });
    });
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
  server.token(),
  server.errorHandler()
]

exports.getTokens = function(req, res) {
  Token.find(function(err, users) {
    if (err) {
      res
        .status(500)
        .send(err)
        .end();
    }
    res.json(users);
  });
}

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
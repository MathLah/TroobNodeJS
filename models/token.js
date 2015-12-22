/**
 * Model Token
 * OAuth2
 *
 * Collection name: Token
 * Fields :
 *  - token: String, required
 *  - expirationDate: String, required
 *  - userId: String, required
 *  - clientId: String, required
 *  - scope: String, required
 */
var mongoose = require('mongoose');

var TokenSchema   = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Token', TokenSchema);
/**
 * Model RefreshToken
 * OAuth2
 *
 * Collection name: RefreshToken
 * Fields :
 *  - refreshToken: String, required
 *  - clientId: String, required
 *  - userId: String, required
 */
var mongoose = require('mongoose');

var RefreshTokenSchema   = new mongoose.Schema({
  refreshToken: {
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
  }
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
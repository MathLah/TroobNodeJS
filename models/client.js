/**
 * Model Client
 * OAuth2
 *
 * Collection name: Client
 * Fields :
 *  - name: String, unique, required
 *  - id: String, required
 *  - secret: String, required
 *  - userId: String, required
 */
var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Client', ClientSchema);
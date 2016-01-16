'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var WhatsAppSchema = new Schema({
  	image: String
});


var Whats = mongoose.model('whatsApp', WhatsAppSchema);
module.exports = Whats;
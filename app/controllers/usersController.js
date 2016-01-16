'use strict';

var mongoose = require('mongoose'),
	WhatsAppModel = mongoose.model('whatsApp'),
	socketIO = null,
	multer = require('multer'),
	upload = multer({ dest: './app/uploads/',
		rename: function (fieldname, filename) {
	        return Date.now();
	    }
	});

exports.fileUpload = function(req, res){

	upload(req, res, function(err) {
		if(err) {
			return res.status(400).send(false);
		}

		socketIO.broadcast.emit('getUploadImage', req.files.file.name);
		socketIO.emit('getUploadImage', req.files.file.name);

		WhatsAppModel.create({image: req.files.file.name}, function(err, result){
			if(err) {
				return res.status(400).send(false);
			}			
			return res.status(200).send(true);
		});
	});
}

exports.getImageData = function (req,res){
	
	WhatsAppModel.find().exec(function(err, result){
		if(err) {
			return res.status(400).send(false);
		}	
		return res.status(200).send(result);
	})
};

exports.setSocket = function (_socketIO, _io){
	socketIO  = _socketIO;
};

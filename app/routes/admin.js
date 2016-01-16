'use strict';

module.exports = function(app){
	var users = require('../controllers/usersController');	

	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    next();
	});

	app.route('/files/upload').post(users.fileUpload);
	app.route('/files/get').get(users.getImageData);
}
var express = require('express');
var router = express.Router();
var users_service = require('../services/users-service');
var multer = require('multer');
var path = require('path');

//upload user
var uploadUser = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/user')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).single('photo');

//upload default
var uploadDefault = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).any();

router.post('/Search', function(req, res, next) {
  users_service.search(req, function(data){
  	res.json(data);
  });
});

router.post('/Add', uploadUser, function(req, res, next) {
  users_service.checkEmail(req, function(data){
  	if(data == "error"){
  		res.json("error");
  	}
  	else if(data > 0){
  		res.json("duplicate");
  	}else{
  		users_service.add(req, function(data){
      		res.json(data);
  		});
  	}
  });
});

router.post('/Update', uploadUser, function(req, res, next){
	users_service.findUser(req, function(data){
		if(data == "error"){
			res.json("error");
		}
		else if(data.email == req.body.email.toLowerCase()){
			users_service.update(req, function(data){
				res.json(data);
			});
		}else{
			users_service.checkEmail(req, function(data){
			  	if(data == "error"){
			  		res.json("error");
			  	}
			  	else if(data > 0){
			  		res.json("duplicate");
			  	}else{
			  		users_service.update(req, function(data){
						res.json(data);
					});
			  	}
			});

		}
  });
});

router.post('/Delete', uploadDefault, function(req, res, next){
	users_service.remove(req, function(data){
		res.json(data);
	});
});

module.exports = router;
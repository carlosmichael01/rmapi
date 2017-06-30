var express = require('express');
var router = express.Router();
var runners_service = require('../services/runners-service');
var multer = require('multer');
var path = require('path');

//upload runner
var uploadRunner = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/runner')
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
  runners_service.search(req, function(data){
  	res.json(data);  	
  });
});

router.post('/Add', uploadRunner, function(req, res, next) {
  runners_service.checkEmail(req, function(data){
  	if(data == "error"){
  		res.json("error");
  	}
  	else if(data > 0){
  		res.json("duplicate");
  	}else{
  		runners_service.add(req, function(data){
      		res.json(data);
  		});
  	}
  });
});

router.post('/Update', uploadRunner, function(req, res, next){
	runners_service.findUser(req, function(data){
		if(data == "error"){
			res.json("error");
		}
		else if(data.email == req.body.email.toLowerCase()){
			runners_service.update(req, function(data){
				res.json(data);
			});
		}else{
			runners_service.checkEmail(req, function(data){
			  	if(data == "error"){
			  		res.json("error");
			  	}
			  	else if(data > 0){
			  		res.json("duplicate");
			  	}else{
			  		runners_service.update(req, function(data){
						res.json(data);
					});
			  	}
			});

		}
  });
});

router.post('/Delete', uploadDefault, function(req, res, next){
	runners_service.remove(req, function(data){
		res.json(data);
	});
});

module.exports = router;
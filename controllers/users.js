var express = require('express');
var router = express.Router();
var users_service = require('../services/users-service');

router.post('/Search', function(req, res, next) {
  users_service.search(req, function(data){
  	res.json(data);
  });
});

router.post('/Add', function(req, res, next) {
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

router.post('/Update', function(req, res, next){
	console.log(req.body);
	users_service.findUser(req, function(data){
		console.log(data);
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

router.post('/Delete', function(req, res, next){
	users_service.remove(req, function(data){
		res.json(data);
	});
});

module.exports = router;
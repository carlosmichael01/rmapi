var express = require('express');
var router = express.Router();
var runners_service = require('../services/runners-service');

router.post('/Search', function(req, res, next) {
  runners_service.search(req, function(data){
  	res.json(data);  	
  });
});

router.post('/Add', function(req, res, next) {
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

router.post('/Update', function(req, res, next){
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

router.post('/Delete', function(req, res, next){
	runners_service.remove(req, function(data){
		res.json(data);
	});
});

module.exports = router;
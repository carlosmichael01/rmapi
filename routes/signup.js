var express = require('express');
var router = express.Router();
var users_service = require('../services/users-service');
var merchants_service = require('../services/merchants-service');
 
router.post('/Merchant', function(req, res, next){

	users_service.checkEmail(req, function(data){
	  	if(data == "error"){
	  		res.json("error");
	  	}
	  	else if(data > 0){
	  		res.json("duplicate");
	  	}else{
  			merchants_service.insertMerchantNameOnly(req, function(data){
  				if(data == "error"){
  					res.json("error");
  				}else{
  					req.body.merchantid = data._id;
  					users_service.addPrimaryOnly(req, function(data){
  						if(data == "error"){
  							res.json("error");
  						}else{
  							res.json(data);	
  						}
  					});
  				}
			});
	  	}
    });

	// var email = req.body.email;
	// var password = req.body.password;
	// users_service.login(email, password, function(data){
 //        //res.json(data);
 //        merchants_service.insertMerchant(req, function(data){


 //        });

 //    });
});

module.exports = router;
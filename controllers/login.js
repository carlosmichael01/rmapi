var express = require('express');
var router = express.Router();
var users_service = require('../services/users-service');
 
router.post('/', function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	users_service.login(email, password, function(data){
        res.json(data);
    });
});

module.exports = router;
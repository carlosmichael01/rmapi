var express = require('express');
var router = express.Router();
var users_service = require('../services/users-service');

// login authentication 
router.post('/', function(req, res, next){
    // if(req.session.email == undefined){
    //     return res.status(401).send();  
    // }
    users_service.findOneUser(req, function(data){
        res.json(data);
    });
});

module.exports = router;
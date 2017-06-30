var express = require('express');
var router = express.Router();
var runners_service = require('../../services/runner/runners-service');


router.post('/', function(req, res) {
  runners_service.updateUser(req,function(success){
      if(success) {
        res.json("success");
      }
      else{
      	res.json("error");
      }
    });
});

module.exports = router;
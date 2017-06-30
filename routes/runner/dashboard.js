var express = require('express');
var router = express.Router();
var runners_service = require('../../services/runner/runners-service');
var transactions_service = require('../../services/runner/transactions-service');


router.post('/', function(req, res, next) {
  runners_service.findUser(req,function(data, err){
      if(err) {
        res.json("error");
      }
      else{
      	res.json(data);
      }
    });
});

router.post('/Status', function(req, res, next) {
  runners_service.updateUserStatus(req,function(success, err){
      if(err) {
        res.json("error");
      }
      else if(success){
          res.json("success");
      }
      else{
        res.json("fail");
      }
    });
});

module.exports = router;
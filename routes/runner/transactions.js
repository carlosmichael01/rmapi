var express = require('express');
var router = express.Router();
var transactions_service = require('../../services/runner/transactions-service');

// find all tasks
router.get('/Test', function(req, res, next) {
 	transactions_service.findAllTask(function(data, err){
        if(err) {
            res.status(500);
            return next(err);
          }else{
             res.json(data);
          }
    });
});

// find runner task
router.post('/', function(req, res) {
 	transactions_service.findRunnerTask(req,function(data){
		res.json(data);
    });
});

// update task status
router.post('/Status', function(req, res, next) {
  transactions_service.updateTaskStatus(req, function(data){
      res.json(data);
  });
});

// update task status
router.post('/AllStatus', function(req, res, next) {
  transactions_service.updateAllTaskStatus(req, function(data){
      res.json(data);
  });
});

//update item status
router.post('/UpdateItemStatus', function(req, res, next) {
  transactions_service.updateItemStatus(req, function(data){
      res.json(data);
  });
});

module.exports = router;
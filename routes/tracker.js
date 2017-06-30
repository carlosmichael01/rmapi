var express = require('express');
var router = express.Router();
var transactions_service = require('../services/transactions-service');
var runners_service = require('../services/runners-service');

router.post('/Transaction', function(req, res, next){
  transactions_service.findTransaction(req, function(data){
        res.json(data);
    });
});

router.post('/TrackRunner', function(req, res, next) {
  runners_service.findLocation(req, function(data){
      res.json(data);
  });
});

router.post('/TrackAllRunner', function(req, res, next) {
  runners_service.findAllLocation(req, function(data){
      res.json(data);
  });
});

module.exports = router;
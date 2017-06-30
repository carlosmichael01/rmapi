var express = require('express');
var router = express.Router();
var transactions_service = require('../services/transactions-service');
var merchants_service = require('../services/merchants-service');
var runners_service = require('../services/runners-service');
var multer = require('multer');

var uploadDefault = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).any();


router.post('/TransactionsByShop', function(req, res, next){
	transactions_service.findTaskByShopId(req, function(data){
		res.json(data)
	});
});

router.post('/TransactionsByArea', function(req, res, next){
	transactions_service.findTaskByArea(req, function(data){
		res.json(data)
	});
});


router.post('/Status', function(req, res, next) {
  transactions_service.updateTaskStatus(req, function(data){
      res.json(data);
  });
});

router.post('/UpdateItemStatus', function(req, res, next) {
  transactions_service.updateItemStatus(req, function(data){
      res.json(data);
  });
});

router.post('/RunnersList', function(req, res, next){
	runners_service.findRunners(req, function(data){
		res.json(data);
	});
});

router.post('/UpdateRunner', uploadDefault,  function(req, res, next){
	transactions_service.updateRunner(req, function(data){
		res.json(data);
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var transactions_service = require('../services/transactions-service');
var merchants_service = require('../services/merchants-service');

// router.get('/All', function(req, res, next){
//   merchants_service.findAllTransactions(function(data){
//         res.json(data);
//     });
// });

// router.get('/MerchantList', function(req, res, next){
// 	merchants_service.findMerchantList(function(data){
//         res.json(data);
//     });
// });

// router.post('/ShopList', function(req, res, next){
// 	merchants_service.findShopList(req, function(data){
//         res.json(data);
//     });
// });


router.post('/TransactionsByShop', function(req, res, next){
	transactions_service.findTaskByShopId(req, function(data){
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

module.exports = router;
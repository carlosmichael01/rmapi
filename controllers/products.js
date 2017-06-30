var express = require('express');
var router = express.Router();
var merchants_service = require('../services/merchants-service');

router.get('/MerchantList', function(req, res, next){
	merchants_service.findMerchantList(function(data){
        res.json(data);
    });
});

router.post('/SortByShopId', function(req, res, next){
	merchants_service.findProducts(req, function(data){
        res.json(data);
    });
});

router.post('/Insert', function(req, res, next){
	merchants_service.inserProduct(req, function(data){
		res.json(data);
	});
});

router.post('/Update', function(req, res, next){
	merchants_service.updateProduct(req, function(data){
		res.json(data);
	});
});

router.post('/Delete', function(req, res, next){
	merchants_service.removeProduct(req, function(data){
		res.json(data);
	});
});

router.get('/Categories', function(req, res, next){
	merchants_service.findItemCategories(function(data){
		res.json(data);
	});
});

router.get('/Cuisines', function(req, res, next){
	merchants_service.findCuisines(function(data){
		res.json(data);
	});
});


module.exports = router; 
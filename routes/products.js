var express = require('express');
var router = express.Router();
var merchants_service = require('../services/merchants-service');
var multer = require('multer');
var path = require('path');

//upload product
var uploadProduct = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/product')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).single('image');

//upload default
var uploadDefault = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).any();

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

router.post('/Insert', uploadProduct, function(req, res, next){
	merchants_service.insertProduct(req, function(data){
		res.json(data);
	});
});

router.post('/Update', uploadProduct, function(req, res, next){
	merchants_service.updateProduct(req, function(data){
		res.json(data);
	});
});

router.post('/Delete', uploadDefault, function(req, res, next){
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
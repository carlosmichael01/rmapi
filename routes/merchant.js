var express = require('express');
var router = express.Router();
var merchants_service = require('../services/merchants-service');
var multer = require('multer');
var path = require('path');

//upload merchant
var uploadMerchant = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/merchant')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).single('logo');

//upload shop
var uploadShop = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/shop')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).single('logo');

router.post('/Add', uploadMerchant, function(req, res, next){
	merchants_service.insertMerchant(req, function(data){
        res.json(data);
    });
});

router.post('/Search', function(req, res, next){
	merchants_service.searchMerchant(req, function(data){
        res.json(data);
    });
});

router.post('/Update', uploadMerchant, function(req, res, next){
	merchants_service.updateMerchant(req, function(data){
        res.json(data);
    });
});

router.post('/Shops', function(req, res, next){
	merchants_service.findMerchantShops(req, function(data){
        res.json(data);
    });
});

router.post('/Shop/Add', uploadShop, function(req, res, next){
	merchants_service.insertShop(req, function(data){
        res.json(data);
    });
});

router.post('/Shop/Update', uploadShop, function(req, res, next){
	merchants_service.updateShop(req, function(data){
        res.json(data);
    });
});

router.get('/ShopTypes', function(req, res, next){
    merchants_service.findShopTypes(function(data){
        res.json(data);
    });
});

router.get('/DeliveryLocations', function(req, res, next){
    merchants_service.findDeliveryLocations(function(data){
        res.json(data);
    });
});

router.get('/MerchantList', function(req, res, next){
    merchants_service.findMerchantList(function(data){
        res.json(data);
    });
});

router.post('/ShopList', function(req, res, next){
    merchants_service.findShopList(req, function(data){
        res.json(data);
    });
});

module.exports = router; 
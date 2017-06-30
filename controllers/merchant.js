var express = require('express');
var router = express.Router();
var merchants_service = require('../services/merchants-service');

// router.post('/', function(req, res, next){
// 	merchants_service.findAllMerchant(req, function(data){
//         res.json(data);
//     });
// });

router.post('/Add', function(req, res, next){
	merchants_service.insertMerchant(req, function(data){
        res.json(data);
    });
});

router.post('/Search', function(req, res, next){
	merchants_service.searchMerchant(req, function(data){
        res.json(data);
    });
});

router.post('/Update', function(req, res, next){
	merchants_service.updateMerchant(req, function(data){
        res.json(data);
    });
});

router.post('/Shops', function(req, res, next){
	merchants_service.findMerchantShops(req, function(data){
        res.json(data);
    });
});

router.post('/Shop/Add', function(req, res, next){
    console.log(req.body);
	merchants_service.insertShop(req, function(data){
        res.json(data);
    });
});

router.post('/Shop/Update', function(req, res, next){
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
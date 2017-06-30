var express = require('express');
var router = express.Router();
var promotions_service = require('../services/promotions-service');
var multer = require('multer');
var path = require('path');

//upload default
var uploadDefault = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).any();

router.post('/Search', function(req, res, next){
	promotions_service.searchPromotion(req, function(data){
        res.json(data);
    });
});

router.post('/Insert', uploadDefault, function(req, res, next){
	promotions_service.insertPromotion(req, function(data){
        res.json(data);
    });
});

router.post('/InsertCode', uploadDefault, function(req, res, next){
  promotions_service.insertPromotionCode(req, function(data){
        res.json(data);
    });
});

router.post('/Update', uploadDefault, function(req, res, next){
	promotions_service.updatePromotion(req, function(data){
        res.json(data);
    });
});

router.post('/UpdateCode', uploadDefault, function(req, res, next){
  promotions_service.updatePromotionCode(req, function(data){
        res.json(data);
    });
});

router.post('/Delete', uploadDefault, function(req, res, next){
	promotions_service.removePromotion(req, function(data){
        res.json(data);
    });
});

// router.get('/List', uploadDefault, function(req, res, next){
//   promotions_service.listPromotion(req, function(data){
//       res.json(data);
//   });
// });



module.exports = router; 
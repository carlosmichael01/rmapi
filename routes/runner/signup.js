var express = require('express');
var router = express.Router();
var runners_service = require('../../services/runner/runners-service');
var multer = require('multer');
var path = require('path');

var uploadRunner = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/runner')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})}).single('photo');

// runner signup
router.post('/', uploadRunner, function(req, res){
    runners_service.checkEmail(req.body.email, function(valid, err){
        if(err){
            res.json("error");
        }
        else if(valid){
            runners_service.signup(req, function(data){
                res.json(data);
            });
        }
        else{
            res.json("invalid");
        }
    });

	
	

});

module.exports = router;
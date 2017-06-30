var runners_model = require('../../models/runners-model').runners;
var bcrypt = require('bcryptjs');
var request = require('request');

exports.findAllUser=function(next){
    runners_model.find({active:true},function(cerr,data){
        if (cerr){
            return next(data, cerr); 
        }else{
         next(data, cerr);
        }
    });
};


exports.findUser=function(req, next){
    runners_model.findOne({_id:req.body.id},function(err,data){
        if (err){
            return next(data, err); 
        }else{
         next(data, err);
        }
    });
};



exports.authUser=function(email,password,next){
  	runners_model.findOne({
    	email:email
    },function (err, data){
    	if (err){
        	return next([],true); 
   		}
      else if(!data){
          return next([],false); 
      }
      else{
       		 var stored_password = data.password;
    			 bcrypt.compare(password, stored_password, function(cerr, valid) {
      				if(cerr){
      					return next([], true); 
      				}
      				else if(valid){
      					return next(data, false);
      				}else{
                return next([], false);
              }
    			});
      }
    });
};

exports.signup=function(req,next){
	password = req.body.password.toLowerCase();
  bcrypt.hash(password,10,function (err,hash){
      if(err){
          return next("error");   
      }
      var newUser = new runners_model({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email.toLowerCase(),
          password: hash,
          address: req.body.address,
          contact: req.body.contact,
          plate: req.body.plate,
          bank: req.body.bank,
          photo: req.file.filename,
          gender: req.body.gender,
          role_type: 'normal',
          created_at: new Date()
      });
      newUser.save(function (err, user){
         if (err){
            console.log(err);
             return next("error");
         }else{
            return next(user._id);
         }
      });
   });
};

exports.checkEmail=function(email,next){
    runners_model.count({email:email.toLowerCase()},function (err,count){
      if (err){
         return next(false, true);
         }
         else if(count == 0){
            next(true, false);
         }
         else{
          next(false, false);
         }
         
    });
};

exports.updateUserStatus = function(req, next){
    runners_model.findOneAndUpdate({"_id":req.body.id},{$set:{"status":req.body.status}},function (err,data){
        if(err){
        next(false, true);
        }
        else{
            next(true, false);
        }
    });
};

exports.updateUser = function(req, next){
  bcrypt.hash(req.body.password.toLowerCase(),10,function (err,hash){
    runners_model.findOneAndUpdate({"_id":req.body.id},
    {$set:{
      "fname":req.body.fname,
      "lname":req.body.lname,
      "gender":req.body.gender,
      "address":req.body.address,
      "contact":req.body.contact,
      "plate":req.body.plate,
      "bank":req.body.bank,
      "email":req.body.email.toLowerCase(),
      "password":hash
    }}, function(err, data){
      if(err){
          next(false);
      }
      else{
          next(true);
      }
    });
  });
};


exports.setGPS = function(req, next){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+req.body.lat+","+req.body.lng+"&key=AIzaSyBDFjLQmSpQMGzVINr8cLWDcfOtGssixF8"
    request(url, function (error, response, body) {
        var last_location = JSON.parse(body).results[0].formatted_address;
        runners_model.findOneAndUpdate({"_id":req.body.id},{$set:{
          "coordinates.lat":req.body.lat,
          "coordinates.lng":req.body.lng,
          "last_location": last_location,
          "last_datetime" : new Date()
        }}
        ,function (err,data){
            return next();
        });
    });
};
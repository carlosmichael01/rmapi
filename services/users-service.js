var users_model = require('../models/users-model').users;
var bcrypt = require('bcryptjs');

exports.login=function(email,password,next){
  	users_model.findOne({
    	email:email,
      active: true
    },"fname lname photo password merchantid",function (err, data){
    	if (err){
        	return next("error"); 
   		}
      else if(!data){
          return next("notfound"); 
      }
      else{
    			 bcrypt.compare(password, data.password, function(cerr, valid) {
      				if(cerr){
      					return next("error"); 
      				}
      				else if(valid){
      					return next(data);
      				}
              else{
                return next("notmatch");
              }
    			});
      }
    });
};

exports.track=function(req, next){
  users_model.findById(req.body.id, "coordinates", function(err, data){
    if(err){
      return next("error");
    }
    return next(data);
  });
};

exports.search = function(req, next){
  param = {fname: new RegExp(req.body.search, "i")};
  if(req.body.merchantid != ""){
     param.merchantid = req.body.merchantid;
  }
  users_model.find(param).count(function(c_err, count){
    if(c_err){
      return next("error"); 
    }
     users_model.find(param).skip(req.body.skip).limit(req.body.limit).exec(function(err, data) {
        if (err){
              return next("error"); 
          }
          return next({count:count, data:data});
    });
  });
};

exports.checkEmail=function(req,next){
    users_model.count({email:req.body.email.toLowerCase()},function (err,count){
      if (err){
        return next("error");
      }
      return next(count);
    });
};

exports.addPrimaryOnly = function(req, next){
  var password = req.body.password.toLowerCase();
  bcrypt.hash(password,10,function (err,hash){
    if(err){
      return next("error");
    }
    var user = new users_model({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email.toLowerCase(),
      password: hash,
      merchantid: req.body.merchantid,
      active : "true",
      created_at: new Date(),
      created_by : "admin"
    });

    user.save(function (err, data){
      if (err){
        return next("error");
      }else{
        return next(data);
      }
   });
  });
};

exports.add = function(req, next){
  var photo = req.body.photo;
  if(req.file){
    photo = req.file.filename;
  }
  merchantid = null;
  if(req.body.merchantid != ""){
      merchantid = req.body.merchantid;
  }
  var password = req.body.password.toLowerCase();
  bcrypt.hash(password,10,function (err,hash){
    if(err){
      return next("error");
    }
    var user = new users_model({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email.toLowerCase(),
      address: req.body.address,
      contact: req.body.contact,
      password: hash,
      photo : photo,
      user_type: req.body.user_type,
      role_type: req.body.role_type,
      merchantid: merchantid,
      active : req.body.active,
      created_at: new Date(),
      created_by : "admin"
    });

    user.save(function (err, data){
      if (err){
        return next("error");
      }else{
        return next("success");
      }
   });
  });
};

exports.update = function(req, next){
   var photo = req.body.old_photo;
  if(req.file){
    photo = req.file.filename;
  }
  merchantid = null;
  if(req.body.merchantid != ""){
      merchantid = req.body.merchantid;
  }
   var password = req.body.old_password;
  if(req.body.password != ""){
      hashPass();
  }else{
      mongoUpdate(password);
  }
  function hashPass(){
    bcrypt.hash(req.body.password.toLowerCase(),10,function (err,hash){
      mongoUpdate(hash);
    });
  }

  function mongoUpdate(hash){
      users_model.findOneAndUpdate({"_id":req.body.id},
      {$set:{
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email.toLowerCase(),
        contact: req.body.contact,
        address: req.body.address,
        password: hash,
        photo : photo,
        user_type: req.body.user_type,
        role_type: req.body.role_type,
        merchantid: merchantid,
        active : req.body.active,
        modified_at: new Date(),
        modified_by : "admin"
      }}, function(err, data){
        if(err){
            next("error");
        }
        else{
            next("success");
        }
      });
  }
};

exports.findUser=function(req, next){
    users_model.findById(req.body.id,function(err,data){
        if (err){
            return next("error"); 
        }
         return next(data);
        
    });
};

exports.remove = function(req, next){
  var userids = JSON.parse(req.body.userids);
  users_model.find({
    '_id': { $in: userids }
  }).remove(function(err, data){
     if (err){
        return next("error"); 
      }
      return next("success");
  });
};
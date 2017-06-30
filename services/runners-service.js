var runners_model = require('../models/runners-model').runners;
var bcrypt = require('bcryptjs');

exports.search = function(req, next){
  param = {fname: new RegExp(req.body.search, "i")}
  if(req.body.city != ""){
     param.city = req.body.city;
  }
  runners_model.find(param).count(function(c_err, count){
    if(c_err){
      return next("error"); 
    }
     runners_model.find(param).skip(req.body.skip).limit(req.body.limit).exec(function(err, data) {
        if (err){
              return next("error"); 
          }
          return next({count:count, data:data});
    });
  });
};

exports.checkEmail=function(req,next){
    runners_model.count({email:req.body.email.toLowerCase()},function (err,count){
      if (err){
        return next("error");
      }
      return next(count);
    });
};

exports.add = function(req, next){
  var photo = req.body.photo;
  if(req.file){
    photo = req.file.filename;
  }
  var password = req.body.password.toLowerCase();
  bcrypt.hash(password,10,function (err,hash){
    if(err){
      return next("error");
    }
    var user = new runners_model({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email.toLowerCase(),
      contact: req.body.contact,
      address: req.body.address,
      password: hash,
      photo : photo,
      plate: req.body.plate,
      bank: req.body.bank,
      city: req.body.city,
      state: req.body.state,
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
     runners_model.findOneAndUpdate({"_id":req.body.id},
    {$set:{
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email.toLowerCase(),
      contact: req.body.contact,
      address: req.body.address,
      password: hash,
      photo : photo,
      plate: req.body.plate,
      bank: req.body.bank,
      city: req.body.city,
      state: req.body.state,
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
    runners_model.findById(req.body.id,function(err,data){
        if (err){
            return next("error"); 
        }
         return next(data);
        
    });
};

exports.remove = function(req, next){
  var userids = JSON.parse(req.body.userids);
  runners_model.find({
    '_id': { $in: userids }
  }).remove(function(err, data){
     if (err){
        return next("error"); 
      }
      return next("success");
  });
};

exports.findLocation=function(req, next){
  runners_model.findById(req.body.id, "fname lname status coordinates", function(err, data){
    if(err){
      return next("error");
    }
    return next(data);
  });
};

exports.findAllLocation=function(req, next){
  runners_model.find({status: req.body.status}, "fname lname coordinates", function(err, data){
    if(err){
      return next("error");
    }
    return next(data);
  });
};

exports.findRunners = function(req, next){
  runners_model.find({}, "fname lname city area photo", function(err, data){
    if(err){
      return next("error");
    }
    return next(data);
  });
}


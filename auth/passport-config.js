module.exports = function() {
  var passport = require('passport');
  var passportLocal = require('passport-local');
  var bcrypt = require('bcryptjs');
  var userService = require('../services/users-service');
  

  
  passport.serializeUser(function(user,next){
      next(null,user.email);
  });
  
  passport.deserializeUser (function(email,next){
     userService.checkEmail(email,function(err,user){
         next (err,user);
     }) ;
     
  });


  passport.use('local-login',new passportLocal.Strategy({usernameField: 'email', passReqToCallback: true},function(req,email,password,next){
      userService.findUser(email,req.body.module,function(err,user){
         if (err){
             return next(err);
         } 
         if(!user){
             return next (null,null, req.flash('loginMessage', 'No user has been found'));
         }
         
         bcrypt.compare(password,user.password,function(err,same){
              if (err) {
                  return next(err, req.flash('loginMessage', 'Got error'));
              }
              
              if(!same){
                  return next(null,null, req.flash('loginMessage', 'Oops! Wrong Password'));
              }
              
              next(null,user);
         });
        
      });
  }));

};
/* Define All Require Modules */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

/* GET users register. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* GET users login. */
router.get('/login', function(req, res, next) {

  res.render('login',{success_msg : res.locals.success_msg, error_msg : res.locals.error_msg,error :   res.locals.error});

});


/* GET users Profile. */
router.get('/index', function(req, res, next) {
       
  res.render('index',{success_msg : res.locals.success_msg, error_msg : res.locals.error_msg,error :   res.locals.error , data:req.user});

});

/* POST Register Data. */
router.post('/register', function(req, res, next) {
    
//get all the variables from the request post
  var name      = req.body.name;
  var email     = req.body.email;
  var username  = req.body.username;
  var password  = req.body.password;
      // Validation
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('username', 'Username is required').notEmpty();
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

            if(errors){
              res.render('register',{
                        errors:errors
                    });
            } else {
                User.getUserByUsername(username, function(err, user){
                    
                   if(err) throw err;
                   
                   if(!user){
                       //Create new object for new User
                       var newUser = new User({
                                name: name,
                                email:email,
                                username: username,
                                password: password
                            });

                        User.createUser(newUser,function(err,user){
                          if(err) throw err;
                        });
                        req.flash('success_msg', 'You are registered and can now login');
                        res.redirect('/users/login');
                   } else {
                        res.render('register',{
                         error_msg:[ {msg: 'User Already Exists'} ],
                        });
                    }

                   });
                
              

           }
});

/* POST Profile Data For Upadte Data. */

router.post('/save', function(req, res, next) {
   
//get all the variables from the request post
  var name      = req.body.name;
  var email     = req.body.email;
  var username  = req.body.username;
  var password  = req.body.password;
  var iddata=  req.session.passport.user;
      // Validation
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('username', 'Username is required').notEmpty();
      req.checkBody('password', 'Password is required').notEmpty();


        var errors = req.validationErrors();
        if(errors){
          res.render('register',{
                    errors:errors
                });
        } else {

          var UserData = {
                name: name,
                email:email,
                username: username,
                password: password,
                iddata:iddata
            };

          User.UpdateUser(UserData,function(err,user){
                 if(err) throw err;
            });

            req.flash('success_msg', 'Update Profile Data Successfully.');
            res.redirect('/users/login');
    }
});
/* User Passport for Compare Password */
passport.use(new LocalStrategy(
  function(username, password, done) {
     
   User.getUserByUsername(username, function(err, user){
       if(err) throw err;
       if(!user){
           return done(null, false, {message: 'Unknown User'});
       }
       User.comparePassword(password, user.password, function(err, isMatch){
          
           if(err) throw err;
           if(isMatch){
               return done(null, user);
           } else {
               return done(null, false, {message: 'Invalid password'});
               
           }
       });
       });
 }));
 
 
/* Serialize User with using passport */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  
/* Deserialize User with using passport */
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

/* Post Data After Login */
router.post('/login',
  passport.authenticate('local',{successRedirect:'/users/index',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  });

/* User Logout */
  router.get('/logout',function(req,res){
    req.logout();
    req.flash('success_msg' , 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;

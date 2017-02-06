/* Define Require Modules */
var express         = require('express');
var router          = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res){
      res.render('index',{msg:res.locals.msg});
});

//Check User is Authenticate User Or Not
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;

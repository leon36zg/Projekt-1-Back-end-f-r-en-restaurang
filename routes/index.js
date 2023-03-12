var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userid){
    res.render('index', { title: req.session.userid });
  } else {
    res.redirect("/login")   
  }
}); 

module.exports = router; 


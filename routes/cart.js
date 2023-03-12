const fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedIn = true;

  var userId = "testUser"
  var result = []

  try {
    var rawData = fs.readFileSync('products_in_cart.json');
    productsInCart = JSON.parse(rawData);
  } catch (err) {
    res.json({ message: 'Error when retrieving from database' })
    return;
  }

  result = productsInCart.filter(item => item.userId == userId);

  if(loggedIn) {
    res.render('cart', { result: result });
  } else {
    res.redirect("/login")
  }
});

router.post('/', function(req, res, next) {
  if (!req.body) {
    res.json({ message: 'Error: invalid product' })
  }

  var productsInCart = null
  var product = req.body;
  product.userId = "testUser"
  

  try {
    var rawData = fs.readFileSync('products_in_cart.json');
    productsInCart = JSON.parse(rawData);
  } catch (err) {
    res.json({ message: 'Error when retrieving from database' })
    return;
  }

  productsInCart.push(product);
  let dataToSave = JSON.stringify(productsInCart);

  fs.writeFileSync('products_in_cart.json', dataToSave);

  console.log(req.body)
  res.json({ message: 'Success' })
});

module.exports = router; 


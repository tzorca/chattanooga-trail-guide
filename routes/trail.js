var express = require('express');
var router = express.Router();

/* GET trail page */
router.get('/', function(req, res, next) {
  res.render('trail', { title: 'Chattanooga Trail Guide - Trail' });
});

module.exports = router;

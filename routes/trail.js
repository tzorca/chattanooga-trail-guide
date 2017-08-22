var express = require('express');
var config = require('../config');
var router = express.Router();

/* GET trail page */
router.get('/', function(req, res, next) {
  res.render('trail', { title: 'Chattanooga Trail Guide - Trail', isQA: config.isQA });
});

module.exports = router;

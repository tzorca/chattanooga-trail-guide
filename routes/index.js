var express = require('express');
var config = rootRequire('config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chattanooga Trail Guide', isQA: config.isQA });
});

/* GET links page. */
router.get('/links', function(req, res, next) {
  res.render('links', { title: 'Chattanooga Trail Guide - Links', isQA: config.isQA });
});

module.exports = router;

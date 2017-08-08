var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chattanooga Trail Guide' });
});

/* GET links page. */
router.get('/links', function(req, res, next) {
  res.render('links', { title: 'Chattanooga Trail Guide - Links' });
});

module.exports = router;

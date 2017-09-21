var express = require('express');
var config = rootRequire('config');
var router = express.Router();
var pageSetup = rootRequire('page-setup');

// Load content
var siteContent = rootRequire('content/content');
siteContent.trailList = rootRequire('content/trail-list').places;

/* GET home page. */
router.get('/', function(req, res, next) {
  var settings = pageSetup.setupPage(siteContent, req.query);
  res.render('index', {
    title: 'Chattanooga Trail Guide',
    isQA: config.isQA,
    siteContent: siteContent,
    settings: settings
  });
});

/* GET trail page */
router.get('/trail', function(req, res, next) {
	var settings = pageSetup.setupPage(siteContent, req.query);
  res.render('trail', {
    title: settings.place.name + ' - Chattanooga Trail Guide',
    isQA: config.isQA,
    siteContent: siteContent,
    settings: settings
  });
});

/* GET map page. */
router.get('/map', function(req, res, next) {
	var settings = pageSetup.setupPage(siteContent, req.query);
  res.render('map', {
  	title: 'Map - Chattanooga Trail Guide',
    isQA: config.isQA,
    siteContent: siteContent,
    settings: settings
  });
});

/* GET links page. */
router.get('/links', function(req, res, next) {
	var settings = pageSetup.setupPage(siteContent, req.query);
  res.render('links', {
  	title: 'Links - Chattanooga Trail Guide',
    isQA: config.isQA,
    siteContent: siteContent,
    settings: settings
  });
});


module.exports = router;

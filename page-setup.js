var util = rootRequire('util');

module.exports = {};
module.exports.loadSettings = function(siteContent, qsParams) {
  var settings = {};
  settings.placeCode = qsParams.place || "";
  settings.seasonCode = qsParams.season || "";
  settings.origin = qsParams.origin || "Chattanooga, TN";
  settings.sortBy = qsParams.sortBy || "name";

  // Load season from query string or from current date
  if (settings.seasonCode === siteContent.seasons.Winter.code) {
    settings.season = siteContent.seasons.Winter;
  } else if (settings.seasonCode === siteContent.seasons.SpringSummerFall.code) {
    settings.season = siteContent.seasons.SpringSummerFall;
  } else if (util.isWinter(new Date())) {
  	settings.season = siteContent.seasons.Winter;
  } else {
    settings.season = siteContent.seasons.SpringSummerFall;
  }

  // Search place list for matching code
  for (var i = 0; i < siteContent.trailList.length; i++) {
    var trail = siteContent.trailList[i];
    if (trail.code == settings.placeCode) {
      settings.place = trail;
      break;
    }
  }

  module.exports.loadCurrentPlaceImagePaths(siteContent)

  return settings;
};

module.exports.loadCurrentPlaceImagePaths = function(siteContent) {
  siteContent.trailList.forEach(function(place) {
    place.xsImagePaths = module.exports.getCurrentImagePaths(place, 'xs');
    place.smImagePaths = module.exports.getCurrentImagePaths(place, 'sm');
    place.lgImagePaths = module.exports.getCurrentImagePaths(place, 'lg');

    if (place.smImagePaths.length === 0) {
      place.tablePhoto = "images/misc/" + "no-image-available.png";
    } else {
      var imagePath = util.getRandomElement(place.smImagePaths);
      place.tablePhoto = imagePath;
    }

    place.loaded = true;
  });
}

module.exports.getCurrentImagePaths = function(place, imageType) {
  return module.exports.getRelevantImagePaths(place, imageType, util.getDatePlusTwoWeeks(new Date()), 20);
};

module.exports.getRelevantImagePaths = function(place, imageType, targetDate, maxImages) {
  var placeImages = place.images;
  if (!placeImages) {
    return [];
  }

  var placeImagesForType = placeImages[imageType];
  if (!placeImagesForType) {
    return [];
  }

  // Sort by closest to targetDate
  for (var i = 0; i < placeImagesForType.length; i++) {
    var placeImage = placeImagesForType[i];
    placeImage.dayOfYearDiff = util.getDayOfYearDifference(targetDate, placeImage.date);
  }

  placeImagesForType.sort(function(placeImageA, placeImageB) {
    return placeImageA.dayOfYearDiff - placeImageB.dayOfYearDiff;
  });

  // Return up to maxImages number of images
  var resultImagePaths = [];
  for (i = 0; i < maxImages; i++) {
    if (i >= placeImagesForType.length) {
      break;
    }

    var placeImageForType = placeImagesForType[i];
    resultImagePaths.push(placeImageForType.path);
  }

  return resultImagePaths;
};

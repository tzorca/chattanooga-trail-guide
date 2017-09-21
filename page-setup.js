var util = rootRequire('util');

module.exports = {};
module.exports.setupPage = function(siteContent, qsParams) {
  var settings = {};
  settings.placeCode = qsParams.place || "";
  settings.sortBy = qsParams.sortBy || "name";

  // Find current trail
  for (var i = 0; i < siteContent.trailList.length; i++) {
    var trail = siteContent.trailList[i];
    if (trail.code == settings.placeCode) {
      settings.place = trail;
      break;
    }
  }

  module.exports.loadCurrentPlaceImagePaths(siteContent);
  module.exports.assignDifficultyInfo(siteContent);
  module.exports.loadActivityIconsHtml(siteContent);

  return settings;
};

module.exports.loadActivityIconsHtml = function(siteContent) {
	siteContent.trailList.forEach(function(trail) {
		trail.activityIconsHtml = util.buildActivityIconsHtml(trail.activityTypes);
	});
};

module.exports.assignDifficultyInfo = function(siteContent) {
  var parseDifficulty = function(difficultySummary) {
    var i, pathRating = 0, terrainRating = 0;
    for (i = 0; i < siteContent.pathTypes.length; i++) {
      if (difficultySummary.indexOf(siteContent.pathTypes[i]) != -1) {
        pathRating = i;
        break;
      }
    }
    for (i = 0; i < siteContent.terrainTypes.length; i++) {
      if (difficultySummary.indexOf(siteContent.terrainTypes[i]) != -1) {
        terrainRating = i;
      }
    }

    return pathRating * siteContent.terrainTypes.length + terrainRating;
  };

  siteContent.trailList.forEach(function(place) {
    place.difficulty = parseDifficulty(place.difficultySummary);
  });
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

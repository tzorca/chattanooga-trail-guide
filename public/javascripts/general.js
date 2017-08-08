/* globals siteContent, isWinter, isInternal, saveSettingsQS, loadSettingsQS, loadPlacePage, loadLabsPage, loadParksPage, require */
/* exported RunChattanoogaPage */
var RunChattanoogaPage = function(pageType) {
  // Set default settings
  var settings = {
    season: "",
    sortBy: "name",
    origin: "Chattanooga, TN",
    place: ""
  };

  var placeCode, currentPlace;
  var currentSeason;

  var Seasons = {
    SpringSummerFall: {
      code: "spring-summer-fall",
      isWinter: false,
      name: "Spring/Summer/Fall"
    },
    Winter: {
      code: "winter",
      isWinter: true,
      name: "Winter"
    }
  };

  // When navigating to another page on the site,
  // automatically add query string parameters
  $("body").on("click", "a", function() {
    if (isInternal($(this).attr('href'))) {
      window.location.href = saveSettingsQS(settings, $(this).attr("href"));
    }
  });

  // Load query string parameters into settings object
  loadSettingsQS(settings);


  // Season setup
  // Check settings first
  if (settings.season === Seasons.Winter.code) {
    currentSeason = Seasons.Winter;
  } else if (settings.season === Seasons.SpringSummerFall.code) {
    currentSeason = Seasons.SpringSummerFall;
  } else {
    if (isWinter(new Date())) {
      currentSeason = Seasons.Winter;
    } else {
      currentSeason = Seasons.SpringSummerFall;
    }
  }

  // Load header
  $("#header").html(siteContent.headerText.replace(/\{SC\}/g, currentSeason.code));

  // Load seasons panel
  var $seasons = $("#seasons");
  if ($seasons) {
    var seasonsHtml = "<ul>";
    for (var seasonKey in Seasons) {
      var season = Seasons[seasonKey];
      if (currentSeason.code == season.code) {
        seasonsHtml += "<li><div class=\"currentchoice\">";
        seasonsHtml += season.name + "<\/div><\/li>";
      } else {
        seasonsHtml += "<li><div class=\"otherchoice\"><a href=\"";
        if (pageType == "Parks") {
          seasonsHtml += "/?season=" + season.code + "\">";
        } else {
          seasonsHtml += pageType.toLowerCase() + "?place=" + placeCode + "&season=" + season.code + "\">";
        }

        seasonsHtml += season.name + "<\/a><\/div><\/li>";
      }
    }
    seasonsHtml += "<\/ul>";
    $seasons.html(seasonsHtml);
  }

  // Load footer
  $("#footer").html(siteContent.footerText);

  placeCode = settings.place;
  // Search place list for matching code
  for (var i = 0; i < siteContent.places.length; i++) {
    if (siteContent.places[i].code == placeCode) {
      currentPlace = siteContent.places[i];
      break;
    }
  }
  if (!currentPlace && pageType == "Trail") {
    alert("Current park is unknown");
  }

  // Load page content
  if (pageType == 'Trail') {
    loadPlacePage(currentPlace);
  } else if (pageType == 'Parks') {
    loadParksPage(settings, currentSeason);
  } else if (pageType == 'Labs') {
    loadLabsPage();
  } else if (pageType == 'Links') {
    var linksHtml = "<h2>Links<\/h2><br \/>";

    siteContent.linkCollection.forEach(function (linkEntry) {
      linksHtml += "<strong>" + linkEntry.category + "<\/strong>";
      for (var j = 0; j < linkEntry.links.length; j++) {
        linksHtml += "<blockquote>";
        linksHtml += "<a href=\"" + linkEntry.links[j].url + "\">" + linkEntry.links[j].name + "<\/a><br \/>";
        linksHtml += linkEntry.links[j].description;
        linksHtml += "<\/blockquote>";
      }
    });
    $("#links").html(linksHtml);
  }
};

/* exported getCurrentImagePaths */
/* globals getDatePlusTwoWeeks */
function getCurrentImagePaths(place, imageType) {
  return getRelevantImagePaths(place, imageType, getDatePlusTwoWeeks(new Date()), 20);
}

/* globals getDayOfYearDifference */
function getRelevantImagePaths(place, imageType, targetDate, maxImages) {
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
    placeImage.dayOfYearDiff = getDayOfYearDifference(targetDate, placeImage.date);
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
}

function getPlacesFromParkContentJSON(callback) {
  $.getJSON("js/park-content.json", function(parkContent) {
    callback(parkContent.places);
  });
}

/* globals siteContent, routeInfoList */


/* exported loadParksPage */
function loadParksPage(settings, currentSeason) {
  // Prepare sorting stuff
  $("#originchooser").dialog();
  closeOriginChooser();
  $("#origin").autocomplete({
    source: siteContent.origins,
    delay: 0,
    autoFocus: true
  });
  $("#origin").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      changeSorting(settings, currentSeason, 'driveDist');
    }
  });
  $("#sortbydrivedist").click(function() {
    changeSorting(settings, currentSeason, 'driveDist');
  });

  var $sortByName = $("<a class='pointer sort'>Name</a>");
  $sortByName.click(function() {
    changeSorting(settings, currentSeason, 'name');
  });

  var $sortByTrailLength = $("<a class='pointer sort'>Trail Length</a>");
  $sortByTrailLength.click(function() {
    changeSorting(settings, currentSeason, 'runDist');
  });

  var $sortByTrailDifficulty = $("<a class='pointer sort'>Trail Difficulty</a>");
  $sortByTrailDifficulty.click(function() {
    changeSorting(settings, currentSeason, 'difficulty');
  });

  var $sortByDrivingDistance = $("<a class='pointer sort'>Driving Distance</a>");
  $sortByDrivingDistance.click(function() {
    openOriginChooser(settings);
  });

  $("#searchpanel").append("<span class='bigger'>Sort by:</span>&nbsp;&nbsp;");
  $("#searchpanel").append($sortByName);
  $("#searchpanel").append("&nbsp;|&nbsp;");
  $("#searchpanel").append($sortByTrailLength);
  $("#searchpanel").append("&nbsp;|&nbsp;");
  $("#searchpanel").append($sortByTrailDifficulty);
  $("#searchpanel").append("&nbsp;|&nbsp;");
  $("#searchpanel").append($sortByDrivingDistance);

  // Parks/trails table
  chooseTablePhotos(settings, currentSeason);

  // Updates
  $("#updates").html("<p><strong>" + siteContent.updates[0].date + "</strong><br />" + siteContent.updates[0].description + "</p>");
}

function closeOriginChooser() {
  $("#originchooser").dialog("close");
}

function openOriginChooser(settings) {
  $("#originchooser").dialog("open");
  $("#origin").val(settings.origin);
  $("#origin").select();
}

/* globals getCurrentImagePaths, getRandomElement */
function chooseTablePhotos(settings, currentSeason) {
  siteContent.places.forEach(function(place) {
    var imagePaths = getCurrentImagePaths(place, 'small');

    if (imagePaths.length === 0) {
      place.tablePhoto = "img/misc/" + "no-image-available.png";
    } else {
      var imagePath = getRandomElement(imagePaths);
      place.tablePhoto = imagePath;
    }

    place.loaded = true;
  });

  buildParksTable(settings, currentSeason);
}


function changeSorting(settings, currentSeason, newSortBy) {
  if (settings.sortBy == newSortBy && settings.sortBy != "driveDist") {
    return;
  }
  settings.sortBy = newSortBy;

  if (settings.sortBy == "driveDist") {
    settings.origin = document.getElementById('origin').value;
    assignRouteInfo();
    closeOriginChooser();
  }

  buildParksTable(settings, currentSeason);
}

function assignRouteInfo(settings) {
  // Get routeInfo objects that have the chosen origin (such as Chattanooga, TN)
  var relevantRouteInfoList = [];
  var lowerCaseOrigin = settings.origin.toLowerCase();
  routeInfoList.forEach(function(routeInfo) {
    if (routeInfo.origin.toLowerCase() == lowerCaseOrigin) {
      relevantRouteInfoList.push(routeInfo);
    }
  });

  // Loop through place objects, and assign them the corresponding
  // time and distance from the routeInfo objects we found
  siteContent.places.forEach(function(place) {
    var currentDist, bestDist = 1000;
    var currentTime;

    for (var j = 0; j < place.locations.length; j++) {
      var jLoc = place.locations[j];
      var locationKey = jLoc[1].toFixed(6) + "," + jLoc[2].toFixed(6);

      for (var k = 0; k < relevantRouteInfoList.length; k++) {
        if (relevantRouteInfoList[k].destination != locationKey) {
          continue;
        }

        currentDist = relevantRouteInfoList[k].dist;
        currentTime = relevantRouteInfoList[k].time;

        if (currentDist < bestDist) {
          bestDist = currentDist;
          place.drivingtime = currentTime;
          place.drivingdist = currentDist;
        }

        break;
      }
    }
  });
}

function assignDifficultyInfo() {
  siteContent.places.forEach(function(place) {
    place.difficulty = parseDifficulty(place.subtitle);
  });
}

function parseDifficulty(subtitle) {
  var i, pathRating = 0,
    terrainRating = 0;
  for (i = 0; i < siteContent.pathTypes.length; i++) {
    if (subtitle.indexOf(siteContent.pathTypes[i]) != -1) {
      pathRating = i;
      break;
    }
  }
  for (i = 0; i < siteContent.terrainTypes.length; i++) {
    if (subtitle.indexOf(siteContent.terrainTypes[i]) != -1) {
      terrainRating = i;
    }
  }

  return pathRating * siteContent.terrainTypes.length + terrainRating;
}


// Rebuild parks table
function buildParksTable(settings, currentSeason) {

  // Re-sort the table
  if (settings.sortBy == "driveDist") {
    assignRouteInfo();
    siteContent.places.sort(driveDistSort);
  } else if (settings.sortBy == "name") {
    siteContent.places.sort(nameSort);
  } else if (settings.sortBy == "runDist") {
    siteContent.places.sort(runDistSort);
  } else if (settings.sortBy == "difficulty") {
    assignDifficultyInfo();
    siteContent.places.sort(difficultySort);
  }

  // Build the table
  var parksTableHtml = "";
  siteContent.places.forEach(function(place) {
    parksTableHtml += '<div class="placecell">';
    parksTableHtml += '  <a href="trail?place=' + place.code + '&season=' + currentSeason.code + '">';
    parksTableHtml += "    <img alt=\"" + place.name + "\"";
    parksTableHtml += "    src='" + place.tablePhoto + "'/>";
    parksTableHtml += "  </a><br />";
    parksTableHtml += "  <strong><a href=\"trail?place=" + place.code + "&season=" + currentSeason.code + "\">" + place.name + "</a></strong><br />";

    // Mini-info
    parksTableHtml += "  <div class=\"left\">";

    // Subtitle
    parksTableHtml += "    <span class=\"lighter smaller indent\">";
    parksTableHtml += "    " + place.subtitle + "<br />";
    parksTableHtml += "    </span>";

    // Trail Length
    parksTableHtml += "    <span class=\"lighter vsm indent\"><strong>trail: </strong> " + place.totalmiles + " mi";

    // Drive time/distance
    if (place.drivingtime && place.drivingtime.length) {
      parksTableHtml += "      &nbsp;&nbsp;&nbsp;<strong>drive</strong>: ";
      parksTableHtml += "      " + (place.drivingdist).toFixed(0) + " mi ";
      parksTableHtml += "      (" + (place.drivingtime * 1.1 / 60).toFixed(0) + " min)";
    }
    parksTableHtml += "    </span>";

    parksTableHtml += "  </div>";

    parksTableHtml += "</div>";
  });

  $("#parkstable").html(parksTableHtml);
}


// Sorting methods

function nameSort(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function driveDistSort(a, b) {
  return a.drivingdist - b.drivingdist;
}

function runDistSort(a, b) {
  return b.totalmiles - a.totalmiles;
}

function difficultySort(a, b) {
  return a.difficulty - b.difficulty;
}

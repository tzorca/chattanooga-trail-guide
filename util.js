var moment = require('moment');

module.exports = {};

module.exports.loadSettingsQS = function(settings, qsParams) {
  for (var key in settings) {
    if (qsParams[key] && qsParams[key] !== "") {
      settings[key] = qsParams[key];
    }
  }
};

// Sourced from http://stackoverflow.com/a/7751977
module.exports.getDatePlusTwoWeeks = function(initialDate) {
  var resultDate = new Date(+initialDate + 12096e5);
  return resultDate;
};

module.exports.getDayOfYearDifference = function(dateA, dateB) {
  var newDateA = new Date(dateA);
  var newDateB = new Date(dateB);

  newDateA.setFullYear(newDateB.getFullYear());

  if (newDateB < newDateA) {
    newDateB.setFullYear(newDateB.getFullYear() + 1);
  }

  var momentA = moment(newDateA);
  var momentB = moment(newDateB);

  var days = Math.abs(momentA.diff(momentB, 'days'));
  if (days > 365 / 2) {
    days -= 365;
    days = Math.abs(days);
  }

  return days;
};

// Sourced from http://stackoverflow.com/a/5915122
module.exports.getRandomElement = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};

module.exports.buildGMapsLink = function(parkname, location) {
  var mapsLink = "";

  // base url stuff
  mapsLink += "https://maps.google.com/maps?daddr=";

  // name
  var name = parkname + " - " + location[0];
  mapsLink += encodeURIComponent(name) + "+%40";

  // lat
  mapsLink += "+" + location[1] + ",";

  // lon
  mapsLink += "+" + location[2];

  // misc stuff
  mapsLink += "&t=m&z=15";

  return mapsLink;
};

module.exports.buildActivityIconsHtml = function(activityTypes) {
  return activityTypes.map(function(activityType) {
    var iconCode = "";

    if (activityType == "run") {
      iconCode = "&#xE566;";
    } else if (activityType == "bike") {
      iconCode = "&#xE52F;";
    } else if (activityType == "hike") {
      iconCode = "&#xE536;";
    } else {
      return "<div>[Unknown Activity Type]</div>";
    }

    return "<i title='" + module.exports.capitalizeFirstLetter(activityType) + "' class='material-icons md-18'>" + iconCode + "</i>";
  }).join("");
};

// Sourced from https://stackoverflow.com/a/42755730
module.exports.capitalizeFirstLetter = function(word) {
  return word[0].toUpperCase() + word.substr(1);
};

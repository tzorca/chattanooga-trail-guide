var moment = require('moment');

module.exports = {};

module.exports.isWinter = function(date) {
  var month = date.getMonth() + 1;
  return (month < 3 || month === 12);
};

/* exported loadSettingsQS */
module.exports.loadSettingsQS = function(settings, qsParams) {
  for (var key in settings) {
    if (qsParams[key] && qsParams[key] !== "") {
      settings[key] = qsParams[key];
    }
  }
};

/* exported saveSettingsQS */
module.exports.saveSettingsQS = function(settings, url) {
  if (url.indexOf("?") == -1) {
    url += "?";
  }

  for (var key in settings) {
    var qspNext = key + "=";

    // Allow for query string overrides inside the original url
    if (url.indexOf(qspNext) != -1) {
      continue;
    }

    // Don't bother adding empty values
    if (!settings[key] || settings[key].length === 0) {
      continue;
    }

    url += "&" + qspNext + encodeURIComponent(settings[key]);
  }
  return url;
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

module.exports.isInternal = function(url) {
  if (!url || (typeof url === "undefined")) {
    return false;
  }

  if (url.startsWith("http:")) {
    return false;
  }

  if (url.startsWith("https:")) {
    return false;
  }
  return true;
};

module.exports.pad = function(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return str;
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

/* exported buildActivityIcons */
module.exports.buildActivityIcons = function(activityTypes) {
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

// Sourced from http://stackoverflow.com/a/26426761
Date.prototype.isLeapYear = function() {
  var year = this.getFullYear();
  if ((year & 3) !== 0) return false;
  return ((year % 100) !== 0 || (year % 400) === 0);
};

// Sourced from http://stackoverflow.com/a/26426761
// Get Day of Year
Date.prototype.getDOY = function() {
  var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var mn = this.getMonth();
  var dn = this.getDate();
  var dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};
/* exported isWinter */
function isWinter(date) {
  var month = date.getMonth() + 1;
  return (month < 3 || month === 12);
}

/* exported loadSettingsQS */
function loadSettingsQS(settings) {
  for (var key in settings) {
    if (qs[key] && qs[key] !== "") {
      settings[key] = decodeURIComponent(qs[key]);
    }
  }
}

/* exported saveSettingsQS */
function saveSettingsQS(settings, url) {
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
}


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

/* exported getDatePlusTwoWeeks */
// Sourced from http://stackoverflow.com/a/7751977
function getDatePlusTwoWeeks(initialDate) {
  var resultDate = new Date(+initialDate + 12096e5);
  return resultDate;
}

/* globals moment */
/* exported getDayOfYearDifference */
function getDayOfYearDifference(dateA, dateB) {
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
}

/* exported getRandomElement */
// Sourced from http://stackoverflow.com/a/5915122
function getRandomElement(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Sourced from https://stackoverflow.com/a/3855394
var qs = (function(a) {
  if (a === "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i) {
    var p = a[i].split('=', 2);
    if (p.length == 1)
      b[p[0]] = "";
    else
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));


if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

/* exported isInternal */
// test if a link is internal
function isInternal(url) {
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
}

/* exported convertUnits */
function convertUnits(srcVal, srcUnit, destUnit) {
  // No conversion needed
  if (srcUnit == destUnit) {
    return srcVal;
  }

  if (srcUnit == "C" && destUnit == "F") {
    return (srcVal * 9 / 5) + 32;
  }

  if ((srcUnit == "km" && destUnit == "mi") ||
    (srcUnit == "kph" && destUnit == "mph")) {
    return srcVal * 0.621371;
  }

  throw new Error("Unit Conversion Error: " +
    srcUnit + " to " + destUnit + " is not implemented.");
}


function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return str;
}

/* exported convertTimeObjectToDecimal */
function convertTimeObjectToDecimal(timeObject) {
  var hh = timeObject.hours;
  var mm = timeObject.minutes;
  var ss = timeObject.seconds;

  if (hh <= 0) {
    hh = 0;
  }
  if (mm <= 0) {
    mm = 0;
  }
  if (ss <= 0) {
    ss = 0;
  }

  return hh * 60 + mm * 1 + ss / 60.0;
}

/* exported convertToTimeString */
function convertToTimeString(time) {
  var hours = Math.floor(time / 60);
  var minutes = Math.floor(time) - (hours * 60);
  var seconds = Math.floor(time * 60) - (hours * 3600) - (minutes * 60);
  var timeString = "";
  if (hours > 0) {
    timeString += hours + ":";
  }
  timeString += pad(minutes, 2) + ":" + pad(seconds, 2);
  return timeString; //+ " (" + time + ")";
}

/* exported fitImage */
function fitImage(imgContainer, img) {
  var window_height = $(imgContainer).height();
  var window_width = $(imgContainer).width();
  var image_width = $(img).width();
  var image_height = $(img).height();
  var height_ratio = image_height / window_height;
  var width_ratio = image_width / window_width;
  if (height_ratio > width_ratio) {
    $(img).width("auto");
    $(img).height("100%");
  } else {
    $(img).width("100%");
    $(img).height("auto");
  }
}

/* exported buildGMapsLink */
function buildGMapsLink(parkname, location) {
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
}
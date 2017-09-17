/* exported siteContent */
module.exports = {
  updates: [{
    date: "9/1/2017",
    description: "Relaunched site as Chattanooga Trail Guide."
  }, {
    date: "12/10/2016",
    description: "Added new photos for all parks."
  }, {
    date: "5/30/2016",
    description: "Added a few new photos for Chickamauga Battlefield and the North Chickamauga section of the Cumberland Trail."
  }, {
    date: "8/18/2014",
    description: "Added Stringer's Ridge trail."
  }, {
    date: "6/18/2013",
    description: "Added difficulty-based sorting and improved location-based sorting"
  }, {
    date: "6/16/2013",
    description: "Added difficulty ratings"
  }, {
    date: "6/15/2013",
    description: "Added new trail: Cumberland Trail"
  }, {
    date: "4/29/2013",
    description: "Added more River Park photos."
  }, {
    date: "4/28/2013",
    description: "Reorganized trails to be based off more accurate naming and location conventions."
  }, {
    date: "2/19/2013",
    description: "Updated winter photos for River Park."
  }, {
    date: "2/4/2013",
    description: "Updated winter photos for Greenway Farm. (Snow pictures!)"
  }, {
    date: "1/19/2013",
    description: "Updated winter photos for Sterchi Farm Greenway."
  }, {
    date: "1/5/2013",
    description: "Updated winter photos for Enterprise South Nature Park."
  }, {
    date: "10/27/2012",
    description: "Added new park: Chickamauga Battlefield Park"
  }, {
    date: "10/6/2012",
    description: "Added new trail: Raccoon Mountain"
  }, {
    date: "9/17/2012",
    description: "Added new photos for Biology Trail."
  }, {
    date: "7/27/2012",
    description: "Updated Enterprise South Nature Park with better photos."
  }, {
    date: "7/10/2012",
    description: "Updated Booker T Washington Trail with better photos."
  }, {
    date: "7/7/2012",
    description: "Added a new trail: Shackleford Ridge Park."
  }, {
    date: "6/2/2012",
    description: "Added new photos for Chattanooga Nature Center."
  }, {
    date: "5/18/2012",
    description: "Added a few new photos for Chickamauga Dam."
  }, {
    date: "5/12/2012",
    description: "Added new photos for Harrison Bay."
  }, {
    date: "5/8/2012",
    description: "Updated site interface with some minor improvements."
  }, {
    date: "5/4/2012",
    description: "Added new photos for River Park."
  }, {
    date: "4/26/2012",
    description: "Updated Greenway Farm with better photos."
  }, {
    date: "4/14/2012",
    description: "Updated Sterchi Farm Greenway with better photos."
  }, {
    date: "4/8/2012",
    description: "Added new photos for Ruby Falls Trail."
  }, {
    date: "4/5/2012",
    description: "Added new photos for Booker T Washington Trail."
  }, {
    date: "3/24/2012",
    description: "Added new photos for Camp Jordan Greenway."
  }, {
    date: "3/23/2012",
    description: "Added new photos for Sterchi Farm Greenway."
  }, {
    date: "3/9/2012",
    description: "Launched site."
  }],

  origins: ["Alton Park, TN", "Apison, TN", "Avondale, TN", "Bakewell, TN", "Bonny Oaks, TN", "Brainerd, TN", "Bridgeport, AL", "Bryant, AL", "Bushtown, TN", "Chattanooga, TN", "Chickamauga, GA", "Chickamauga, TN", "Cleveland, TN", "Clifton Hills, TN", "Cohutta, GA", "Collegedale, TN", "Dalton, GA", "Dunlap, TN", "East Brainerd, TN", "East Chattanooga, TN", "East Lake, TN", "East Ridge, TN", "Eastdale, TN", "Fairmount, TN", "Flintstone, GA", "Fort Oglethorpe, GA", "Glenwood, TN", "Graysville, GA", "Guild, TN", "Harrison, TN", "Hickory Valley, TN", "Higdon, AL", "Hixson, TN", "Indian Springs, GA", "Jasper, TN", "Kimball, TN", "La Fayette, GA", "Laager, TN", "Lakesite, TN", "Lookout Mountain, GA", "Lookout Mountain, TN", "Lookout Valley, TN", "Lupton City, TN", "McDonald, TN", "Middle Valley, TN", "North Chattanooga, TN", "Ooltewah, TN", "Orchard Knob, TN", "Palmer, TN", "Powells Crossroads, TN", "Red Bank, TN", "Ridgedale, TN", "Ridgeside, TN", "Ringgold, GA", "Rising Fawn, GA", "Rock Spring, GA", "Rocky Face, GA", "Rossville, GA", "Sale Creek, TN", "Sequatchie, TN", "Signal Mountain, TN", "Soddy-Daisy, TN", "South Pittsburg, TN", "Stuart Heights, TN", "Trenton, GA", "Tunnel Hill, GA", "Tyner, TN", "Varnell, GA", "Walden, TN", "Westside, GA", "Whiteside, TN", "Whitwell, TN", "Wildwood, GA"],

  mapDirectory: "images/maps/",

  pathTypes: [
    "Flat",
    "Hilly",
    "Steep",
    "Technical"
  ],

  terrainTypes: [
    "paved",
    "paved/gravel",
    "grass/paved",
    "mixed terrain",
    "dirt",
    "dirt/gravel",
    "dirt/rock"
  ],

  seasons: {
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
  },

  linkCollection: [{
    category: "Local Parks and Trails",
    links: [{
      name: "Roots Rated - Chattanooga Trail Running",
      description: "\"Exclusive access to the most authentic outdoor recreation in cities across the country\"",
      url: "http://rootsrated.com/chattanooga-tn/trail-running"
    }, {
      name: "Outdoor Chattanooga",
      description: "\"A division of the city of Chattanooga's Parks and Recreation department\"",
      url: "http://www.outdoorchattanooga.com"
    }, {
      name: "Wild Trails",
      description: "\"Promoting the use, expansion and protection of trails in greater Chattanooga\"",
      url: "http://wildtrails.org/"
    }, {
      name: "Tennessee State Parks",
      description: "",
      url: "http://www.tnstateparks.com/"
    }]
  }, {
    category: "Local Running Groups",
    links: [{
      name: "Chattanooga Track Club",
      description: "\"Promoting Running and Fitness in Chattanooga\"",
      url: "http://www.chattanoogatrackclub.org"
    }, {
      name: "Rock/Creek Trail Races",
      description: "\"Trail Running races from 1k to 50 miles\"",
      url: "http://races.rockcreek.com/"
    }]
  }],


  footerText: "<p>&copy; 2012-2017 <a href=\"mailto:runchattanooga@gmail.com\">Tim Zorca<\/a><\/p>",

  headerText: "<div class=\"container\">" +
    "<div id=\"logo\"><a href=\"/?season={SC}\">Chattanooga Trail Guide<\/a><\/div>" +
    "<ul>" +
    "<li><a href=\"/?season={SC}\">Trails<\/a><\/li>" +
    "<li><a href=\"map?season={SC}\">Map<\/a><\/li>" +
    "<li><a href=\"links?season={SC}\">Links<\/a><\/li>" +
    "<\/ul>" +
    "<\/div>"
};

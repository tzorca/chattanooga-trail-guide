/* globals buildGMapsLink */
/* exported loadPlacePage */
function loadPlacePage(currentPlace) {
  // Place Title
  var placeTitleHtml = currentPlace.name + "<br />";
  placeTitleHtml += "<em>" + currentPlace.subtitle + "</em>";
  $("#placetitle").html(placeTitleHtml);
  document.title = currentPlace.name;

  // Notes
  if (currentPlace.notes) {
    var notesHtml = "<strong>Note";
    if (currentPlace.notes.length > 1) {
      notesHtml += "s";
    }
    notesHtml += "</strong>";
    for (var i = 0; i < currentPlace.notes.length; i++) {
      notesHtml += "<div class='indent'>" + currentPlace.notes[i] + "</div>";
    }
    $("#notes").html(notesHtml);
  } else {
    // Remove the section if there are no notes
    $("#notes").remove();
  }
  //
  //    Description
  var descriptionHtml = "<strong>Description</strong>";
  descriptionHtml += "<br /><span class='indent inlineFlexMiddle'>Activities: " + buildActivityIcons(currentPlace.activityTypes) + "</span>";
  descriptionHtml += "<div class='indent'>Trail Distance: " + currentPlace.totalMiles + " miles</div>";
  $("#description").html(descriptionHtml);
  //
  //    Driving Directions
  var directionsHtml = "<strong>Driving Directions</strong>";
  currentPlace.locations.forEach(function(location) {
    directionsHtml += '<div class="indent"><a target="_blank" href="' + buildGMapsLink(currentPlace.name, location) + '">' + location[0] + '</a></div>';
  });
  $("#directions").html(directionsHtml);

  //
  //    More Information
  var moreInfoHtml = "<strong>More Information</strong>";
  currentPlace.links.forEach(function(link) {
    moreInfoHtml += "<div class='indent'><a href='" + link[1] + "'>" + link[0] + "</a></div>";
  });
  $("#moreinfo").html(moreInfoHtml);

  loadPlaceImages(currentPlace);
}

/* globals pad */
function loadPlaceImages(currentPlace) {
  var smallImagePaths = getCurrentImagePaths(currentPlace, "small");
  var largeImagePaths = getCurrentImagePaths(currentPlace, "large");
  var imageCount = smallImagePaths.length;
  var pagephotos = [], pagethumbs = [];

  // Load image panel, thumbnails panel, and first image
  var $imageView = $('#imageview');
  $imageView.css('background-image', '');
  if (imageCount) {
    pagephotos[0] = new Image();
    pagephotos[0].src = largeImagePaths[0];
    $('#photos').html("");
    $('#photos').append("<strong>Photos</strong>");

    var $thumbnailList = $("<ul id='thumbs'></ul>");
    for (var i = 0; i < imageCount; i++) {
      var $previewImgLink = $("<a class='pointer'>" +
        "<div id='t" + i + "'>" +
        "<img id='thumb" + pad(i, 2) + "' src='images/misc/loading.gif'/>" +
        "</div>" +
        "</a>");
      $previewImgLink.click(getFunctionForSetCurrentPlaceImage(currentPlace, i));

      $thumbnailList.append($previewImgLink.wrap("<li></li>").parent());
    }

    $("#photos").append($thumbnailList);

    setCurrentPlaceImage(currentPlace, 0);
    loadPlaceThumbnail(currentPlace, 0);
  } else {
    setImgToNA();
  }

  // Add map links
  if (currentPlace.maps && currentPlace.maps.length > 0) {
    $('#map').html("");
    $('#map').append("<strong>Trail Maps</strong><br>");

    currentPlace.maps.forEach(function(mapEntry) {
      var mapTitle = mapEntry[0];
      var mapUrl = siteContent.mapDirectory + mapEntry[1];
      
      var $indentWrapper = $("<div class='indent'></div>");
      var $mapLink = $("<a class='pointer' target='_blank'>" + mapTitle + "</a>");
      $mapLink.data('map-url', mapUrl);
      $mapLink.click(setImgToSelectedMap);

      $indentWrapper.append($mapLink);
      $('#map').append($indentWrapper);
    });

  }

  // Cache images and thumbnails, displaying thumbnails as images are available
  if (imageCount > 0) {
    for (var imgIdx = 1; imgIdx < imageCount; imgIdx++) {
      pagephotos[imgIdx] = new Image();
      pagethumbs[imgIdx] = new Image();
      pagephotos[imgIdx].onload = function() {
        loadPlaceThumbnail(currentPlace, this.someIndex);
      };
      pagephotos[imgIdx].someIndex = imgIdx;
      pagephotos[imgIdx].src = largeImagePaths[imgIdx];
      pagethumbs[imgIdx].src = smallImagePaths[imgIdx];
    }

  } else {
    setImgToNA();
  }

}

/* globals getCurrentImagePaths */
function loadPlaceThumbnail(currentPlace, i) {
  var smallImagePaths = getCurrentImagePaths(currentPlace, "small");

  var tempElement = document.getElementById("thumb" + pad(i, 2));
  tempElement.src = smallImagePaths[i];
}


function getFunctionForSetCurrentPlaceImage(currentPlace, imgNum) {
  return function() {
    setCurrentPlaceImage(currentPlace, imgNum);
  };
}

// Set image view's image to a photo from the current location
/* globals fitImage */
function setCurrentPlaceImage(currentPlace, imgNum) {
  var largeImagePaths = getCurrentImagePaths(currentPlace, "large");
  var imgSrc = largeImagePaths[imgNum];
  var $imageview = $('#imageview');

  // Clear current elements from image view (in case of embed)
  $imageview.empty();

  $imageview.css('background-image', 'url(' + imgSrc + ')');
}

// Set the image view to display the selected map
function setImgToSelectedMap() {
  var $mapLink = $(this);
  var mapUrl = $mapLink.data('map-url');
  var mapExt = mapUrl.split('.').pop().toLowerCase();
  var $imageview = $('#imageview');

  // Clear current elements from image view
  $imageview.empty();
  
  // Set new view
  if (mapExt == 'pdf') {
    $imageview.append("<embed src='" + mapUrl + "' type='application/pdf'></embed>");
  } else if (mapExt == 'jpg' || mapExt == 'png') {
    $imageview.css('background-image', 'url(' + mapUrl + ')');
  } else {
    console.error("Unexpected map extension in " + mapUrl);
  }
}

// Set image view's image to the no-image-available image
function setImgToNA() {
  var $imageview = $('#imageview');
  var imgSrc = "images/misc/" + "no-image-available.png";
  $imageview.css('background-image', 'url(' + imgSrc + ')');
}

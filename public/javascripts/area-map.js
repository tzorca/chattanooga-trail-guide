function initMap() {
    var map = L.map('parksmap').setView([35.097808, -85.250222], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 16,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2hhdHRhbm9vZ2F0cmFpbGd1aWRlIiwiYSI6ImNqNnd0cDljZzFkbGcycXM2d3N1Y3k5YmkifQ.oEACNqOkOcbSjbk3q94b9Q'
    }).addTo(map);

    return map;
}

function addMarkersForPlace(map, place) {
    place.locations.forEach(function(location) {
        var locationName = location[0];
        var lat = location[1];
        var lon = location[2];

        var markerDescription = "<strong>" + place.name + "</strong><br>" +
        locationName + "<br>" +
        "<a href='trail?place=" + place.code + "'>Trail Info</a><br>" +
        "<a target='_blank' href='" + buildGMapsLink(place.name, location) + "'>Directions</a>";

        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(markerDescription);
    });
}
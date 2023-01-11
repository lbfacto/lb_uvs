var map = L.map('map').setView([14.6898, -17.4480], 0);
//create autocomplete objects for all inputs

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Calculateur de distance sur map SENEGAL By Abdoulaye ba UVS M2 Dig Data',
    minZoom: 1,
    maxZoom: 20
}).addTo(map);

L.marker([14.7841, -16.9395]).addTo(map)
    .bindPopup('Thies.<br>SENEGAL.')
    .openPopup();
L.marker([14.6443, -16.2488]).addTo(map)
    .bindPopup('Diorurbel.<br>SENEGAL.')
    .openPopup();
L.marker([12.5432, -16.2666]).addTo(map)
    .bindPopup('Casamance.<br>SENEGAL.')
    .openPopup();
L.marker([16.013, -16.425]).addTo(map)
    .bindPopup('Saint Louis.<br>SENEGAL.')
    .openPopup();
L.marker([12.5532, -12.1935]).addTo(map)
    .bindPopup('Kedougou.<br>SENEGAL.')
    .openPopup();
//activation gestion des itineraires

L.Routing.control({
    geocoder: L.Control.Geocoder.nominatim(),
    lineOptions: {
        style: [{
                color: '#839c49',
                opacity: 1,
                weight: 7
            }

        ]
    },
    router: new L.Routing.osrmv1({
        language: 'fr',
        profile: 'trafic',
        profile1: 'travel'
    })

}).addTo(map);

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}
var map = null;


$(document).ready(function() {

    initilizeMap();
    createMarker();
});


function initilizeMap() {
    map = new L.Map('map', {
        center: new L.LatLng([14.7841, -16.9395]),
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        doubleClickZoom: false
    });

}

function createMarker() {
    var markerFrom = L.circleMarker([14.7841, -16.9395], { color: "#F00", radius: 10 });
    var markerTo = L.circleMarker([18.9750, 72.8258], { color: "#4AFF00", radius: 10 });
    var from = markerFrom.getLatLng();
    var to = markerTo.getLatLng();
    markerFrom.bindPopup('dakar ' + (from).toString());
    markerTo.bindPopup('thies ' + (to).toString());
    map.addLayer(markerTo);
    map.addLayer(markerFrom);
    getDistance(from, to);
}

function getDistance(from, to) {
    var container = document.getElementById('distance');
    container.innerHTML = ("dakar to thies - " + (from.distanceTo(to)).toFixed(0) / 1000) + ' km';
}

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}
var distance = getDistance([lat1, lng1], [lat2, lng2]);

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}
var distance = getDistance([lat1, lng1], [lat2, lng2]);
geocoder = new L.Control.Geocoder.Nominatim();



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OSM'
}).addTo(map);
//alert(geoCodeLocation.latLng1.lat);
// L.marker([geoCodeLocation1.latLng1.lat, geoCodeLocation1.latLng1.lng]).addTo(map)
//    .bindPopup(loc1)
//    .openPopup();
// L.marker([geoCodeLocation2.latLng2.lat, geoCodeLocation2.latLng2.lng]).addTo(map)
//    .bindPopup(loc2)
//    .openPopup();

L.Routing.control({
        show: false,
        waypoints: [
            L.latLng(geoCodeLocation1.latLng1.lat, geoCodeLocation1.latLng1.lng),
            L.latLng(geoCodeLocation2.latLng2.lat, geoCodeLocation2.latLng2.lng)
        ]
    }).on('routesfound', function(e) {
        if (e.routes[0] != null) {
            //console.log(e.routes[0]);
            //console.log(e.routes[0].summary.totalDistance/1000 + "Km");
            //console.log(e.routes[0].summary.totalTime/60 + "Hrs");
            var totalHrs = e.routes[0].summary.totalTime / 60;
            var totalMnts = (totalHrs / 60).toFixed(1);
            console.log(totalMnts);
            var splitMnt = totalMnts.toString().split('.');
            var onlyHrs = splitMnt[0];
            var onlyMinutes = (parseFloat(splitMnt[1]) * 60);
            $('#distance1').text((e.routes[0].summary.totalDistance / 1000).toFixed(1) + " Km, ");
            $('#time1').text(onlyHrs + "h " + Math.floor(onlyMinutes / 10) + " Minutes");
            console.log(onlyHrs + "--" + Math.round(onlyMinutes));
        }
        if (e.routes[1] != null) {
            //console.log(e.routes[1]);
            //console.log(e.routes[1].summary.totalDistance/1000 + "Km");
            var totalHrs1 = e.routes[1].summary.totalTime / 60;
            var totalMnts1 = (totalHrs1 / 60).toFixed(1);
            var splitMnt1 = totalMnts1.toString().split('.');
            var onlyHrs1 = splitMnt1[0];
            var onlyMinutes1 = (parseFloat(splitMnt1[1]) * 60);
            $('#distance2').text((e.routes[1].summary.totalDistance / 1000).toFixed(1) + " Km, ");
            $('#time2').text(onlyHrs1 + "h " + Math.floor(onlyMinutes1 / 10) + " Minutes");
            //console.log(onlyHrs + "--" + onlyMinutes );
        }

    })
    .addTo(map);
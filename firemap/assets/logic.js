// Store our API endpoint as queryUrl.
let queryUrl = "http://127.0.0.1:8000/api/v1.0/find_features";
var geoJsonObject = null;
let myMap = L.map("map", {
    center: [37.807246697771554, -122.43170695660642],
    zoom: 6
});


// color
var colorGenerator = d3.scaleSequential().domain([2000,2023]).range(["blue", "red"]);

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


initFireLogic();
initTemperatureLogic();
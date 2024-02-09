// Store our API endpoint as queryUrl.
let queryUrl = "../California_Fire_Perimeters_(all).geojson";
let myMap = L.map("map", {
  center: [37.807246697771554, -122.43170695660642],
  zoom: 6
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  L.geoJson(data,{
    style: function(feature) {
      return {
        color: "red",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillOpacity: 0.5,
        weight: 1.5
      };
    }
  }).addTo(myMap);
});

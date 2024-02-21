// Store our API endpoint as queryUrl.
let queryUrl = "http://127.0.0.1:5000/api/v1.0/find_features";
let myMap = L.map("map", {
  center: [37.807246697771554, -122.43170695660642],
  zoom: 6
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


addDropDown();

function addDropDown() {
  /////// creates dropdown
  let customControl = L.control({position: 'topleft'});
  customControl.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<select class="wide-control"><option value="2010">2010</option><option value="2020">2020</option><option value="2000">2000</option></select>';
    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    div.firstChild.onchange = function () {
      requestMarkers(this.value);
    };
    return div;
  };

  customControl.addTo(myMap); // Add the custom control to your map
}

//requestMarkers(2020);

function renderMarkers(data) {
  L.clearLayers();
  L.geoJson(data, {
    style: function (feature) {
      return {
        color: "red",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillOpacity: 0.5,
        weight: 1.5
      };
    }
  }).addTo(myMap);
}

// Perform a GET request to the query URL/
function requestMarkers(year){
  d3.json(`${queryUrl}/${year}`).then(function (data) {
    renderMarkers(data);
  });

}


// Adding the tile layer
let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let myMap = L.map("map", {
    center: [37.807246697771554, -122.43170695660642],
    zoom: 6,
    layers:[baseLayer, heatmapLayer, geoJsonObject]
});
// Store our API endpoint as queryUrl.

function addDropDown(min, max) {
    /////// creates dropdown
    let customControl = L.control({position: 'bottomleft'});
    customControl.onAdd = function (myMap) {
        let div = L.DomUtil.create('div', 'slider-main');
        let sliderLblValues = L.DomUtil.create('div', 'slider-lbl-values', div);
        let sliderValue = L.DomUtil.create('span', 'slider-value', sliderLblValues);
        sliderValue.innerHTML = "2000";
        let slider = L.DomUtil.create('div', 'slidecontainer', div);
        slider.innerHTML = "<input type=\"range\" min=\"" + min + "\" max=\"" + max + "\" value=\"1\" class=\"slider\" id=\"myRange\"/>";
        slider.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        slider.firstChild.onmouseup = function () {
            sliderValue.innerHTML = (this.value);
            requestMarkers(this.value);
            requestTemperatureMarkers(this.value);
        };
        return div;
    };
    customControl.addTo(myMap);
}

function setUpMap(){
    var overlayMaps = {};

    if (myMap.layerControl) {
        myMap.removeControl(myMap.layerControl);
    }
    // Only add 'Fires' to overlayMaps if geoJsonObject is not null
    if (geoJsonObject) {
        overlayMaps['Fires'] = geoJsonObject;
    }

    // Only add 'Temperature' to overlayMaps if heatmapLayer is not null
    if (heatmapLayer) {
        overlayMaps['Temperature'] = heatmapLayer;
    }
    myMap.layerControl = L.control.layers(null, overlayMaps).addTo(myMap);
}

requestMarkers(2000);
requestTemperatureMarkers(2000);
addDropDown(2000, 2022);

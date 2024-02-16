// Adding the tile layer
let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Store our API endpoint as queryUrl.
let myMap = L.map("map", {
    center: [37.807246697771554, -122.43170695660642],
    zoom: 6,
    layers:[baseLayer,heatmapLayer]
});

function addDropDown(min, max) {
    /////// creates dropdown
    let customControl = L.control({position: 'bottomleft'});
    customControl.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'slider-main');
        let sliderLblValues = L.DomUtil.create('div', 'slider-lbl-values', div);
        let sliderValue = L.DomUtil.create('span', 'slider-value', sliderLblValues);
        sliderValue.innerHTML = "1999";
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

    customControl.addTo(myMap); // Add the custom control to your map
}
addDropDown(1999, 2022);

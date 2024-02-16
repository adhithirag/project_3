
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
        };
        return div;
    };

    customControl.addTo(myMap); // Add the custom control to your map
}

// this will display the markers
function renderMarkers(data,year) {
    if (geoJsonObject) {
        myMap.removeLayer(geoJsonObject);
    }
    geoJsonObject = L.geoJson(data, {
        style: function (feature) {
            return {
                color: colorGenerator(year),
                fillOpacity: 0.5,
                weight: 1.5
            };
        }
    });
    geoJsonObject.addTo(myMap);
}

// Perform a GET request to the query URL/
function requestMarkers(year) {

    // loader before calling the server
    Swal.fire({
        icon: "success",
        title: "Processing...",
        allowEscapeKey:false,
        html: `
        <div class='rainbow'></div>
        `,
        showConfirmButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    })

    // calling the server
    d3.json(`${queryUrl}/${year}`).then(function (data) {
        renderMarkers(data,year); // displaying the markers
        // closing the loader
        Swal.close();
    }).catch(() => {
        // if error then show the box
        Swal.fire({
            icon: "error",
            title: "Unexpected error try again"
        })
    });


}

function initFireLogic(){
    // init slider
    addDropDown(1999, 2022);
}
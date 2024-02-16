let temperatureURL = "http://127.0.0.1:8000/api/v1.0/temperatures/";

var cfgTemperature = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    "radius": 4,
    "maxOpacity": .6,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lon',
    // which field name in your data represents the data value - default "value"
    valueField: 'value'
};

var heatmapLayer = new HeatmapOverlay(cfgTemperature);

function filteredData(data){
    return{
        max: data.max,
        data: data.data.filter(function(point) {
            return point.value !== 0; // Keep data points where count is not equal to 0
        })
    }
};


function renderTemperatureMarkers(data, year){
    heatmapLayer.setData(filteredData(data));
}

function requestTemperatureMarkers(year){

    // calling the server
    d3.json(`${temperatureURL}${year}`).then(function (data) {
        renderTemperatureMarkers(data,year); // displaying the markers
        // closing the loader

    }).catch((e) => {
        console.log(e)
        Swal.fire({
            icon: "error",
            title: "Unexpected error try again"
        });
    });

}


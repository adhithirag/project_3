let queryUrl = "http://127.0.0.1:8000/api/v1.0/find_features";
var geoJsonObject = null;

// color
var colorGenerator = d3.scaleSequential().domain([2000,2023]).range(["blue", "red"]);

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
        });
    });
}

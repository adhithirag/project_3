let queryUrl = "http://127.0.0.1:8000/api/v1.0/find_features";


// color
var colorGenerator = d3.scaleSequential().domain([2000, 2023]).range(["blue", "red"]);

var geoJsonObject = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// this will display the markers
function renderMarkers(data, year) {
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
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>Acress burned</h3> <hr> <h4>" + feature.properties.GIS_ACRES.toFixed(2) + "</h4>");
        }
    });
    geoJsonObject.addTo(myMap);
    displayInformationBox("fire-stat", `Total: <strong>${Intl.NumberFormat(undefined,{ maximumSignificantDigits: 3 }).format(totalAcresBurned(data))}</strong> acres burned`,  "bottomleft", myMap, "fa-fire");
    setUpMap();
}

// Perform a GET request to the query URL/
function requestMarkers(year) {

    // loader before calling the server
    Swal.fire({
        icon: "success",
        title: "Processing...",
        allowEscapeKey: false,
        html: `
        <div class='rainbow'></div>
        `,
        showConfirmButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    });

    // calling the server
    d3.json(`${queryUrl}/${year}`).then(function (data) {
        renderMarkers(data, year); // displaying the markers
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

function totalAcresBurned(data) {
    if(data.length === 0){
        return 0;
    }
    return data.filter(x => typeof x.properties !== 'undefined'
        && typeof x.properties.GIS_ACRES !== 'undefined')
        .map(x => x.properties.GIS_ACRES)
        .reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2);
}

function setupGraphSlider() {
    L.easyButton({
        states: [{
            stateName: 'display-graphs',
            icon: 'fa-pie-chart',
            title: 'Display graph preview',
            onClick: function (btn, map) {
                Swal.fire({
                    allowEscapeKey: true,
                    html: d3.select("#fire-slider").html(),
                    showConfirmButton: false,
                    title: "California Fire stats",
                    width: '800px',
                    didOpen: () => {
                        const swiper = new Swiper('.swiper', {

                            autoHeight:true,
                            // Navigation arrows
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },

                        });
                    },
                    showLoaderOnConfirm: false,
                    allowOutsideClick: () => !Swal.isLoading()
                });
            }
        }]
    }).addTo(myMap);

    L.easyButton({
        states: [{
            stateName: 'display-graphs-ext',
            icon: 'fa-thermometer-empty',
            title: 'Display graph preview',
            onClick: function (btn, map) {
                Swal.fire({
                    allowEscapeKey: true,
                    html: d3.select("#temperature-slider").html(),
                    showConfirmButton: false,
                    title: "Temperature stats",
                    width: '800px',
                    didOpen: () => {
                        const swiper = new Swiper('.temperature-swiper', {

                            autoHeight:true,
                            // Navigation arrows
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },

                        });
                    },
                    showLoaderOnConfirm: false,
                    allowOutsideClick: () => !Swal.isLoading()
                });
            }
        }]
    }).addTo(myMap);
}

function setUpExtendedD3Graphs() {
    L.easyButton({
        position: 'bottomleft',
        states: [{
            stateName: 'display-graphs-ext',
            icon: 'fa-line-chart',
            title: 'Display graph preview',
            onClick: function (btn, map) {
                Swal.fire({
                    allowEscapeKey: true,
                    html: d3.select("#fire-slider-ext").html(),
                    showConfirmButton: false,
                    title: "California Fire stats",
                    width: '1200px',
                    height:'900px',
                    showLoaderOnConfirm: false,
                    allowOutsideClick: () => !Swal.isLoading()
                });
            }
        }]
    }).addTo(myMap);
}

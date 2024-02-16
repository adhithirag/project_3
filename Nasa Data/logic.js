let queryUrl = "http://127.0.0.1:5000/api/v1.0/find_features";
//addDropDown();
var baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  }
);
let combinedYears = {
  "2000": year00,
  "2001": year01,
  "2002": year02,
  "2003": year03,
  "2004": year04,
  "2005": year05,
  "2006": year06,
  "2007": year07,
  "2008": year08,
  "2009": year09,
  "2010": year10,
  "2011": year11,
  "2012": year12,
  "2013": year13,
  "2014": year14,
  "2015": year15,
  "2016": year16,
  "2017": year17,
  "2018": year18,
  "2019": year19,
  "2020": year20,
  "2021": year21,
  "2022": year22,
  "2023": year23
};

//console.log(JSON.stringify(combinedYears, null, 2));

var cfg = {
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

function filteredData(data){
  return{
    max: data.max,
    data: data.data.filter(function(point) {
      return point.value !== 0; // Keep data points where count is not equal to 0
    })
  }
};

var heatmapLayer = new HeatmapOverlay(cfg);

function dataMap(year){
  console.log(combinedYears[year])
  
  heatmapLayer.setData(filteredData(combinedYears[year]));

}

var map = new L.Map('map', {
  center: new L.LatLng(25.6586, -80.3568),
  zoom: 4,
  layers: [baseLayer, heatmapLayer]
});


//addDropDown();

// function addDropDown() {
//   /////// creates dropdown
//   let customControl = L.control({position: 'topleft'});
//   customControl.onAdd = function (map) {
//     let div = L.DomUtil.create('div', 'slidecontainer');
//     // div.innerHTML = '<select class="wide-control">' +
//     //     '<option value="0">Select year</option>' +
//     //     '</select>';
//     div.innerHTML = "<input type=\"range\" min=\"2000\" max=\"2021\" value=\"1\" class=\"slider\" id=\"myRange\">\n";
//     div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
//     div.firstChild.oninput = function () {
//       requestMarkers(this.value);
//       dataMap(this.value);
//     };
//     return div;
//   };

//   customControl.addTo(map); // Add the custom control to your map
// }

// function requestMarkers(year){
//   d3.json(`${queryUrl}/${year}`).then(function (data) {
//     renderMarkers(data);
//   });
// }


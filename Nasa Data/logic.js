const files = [
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2000.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2001.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2002.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2003.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2004.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2005.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2006.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2007.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2008.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2009.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2010.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2011.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2012.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2013.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2014.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2015.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2016.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2017.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2018.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2019.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2020.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2021.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2022.json',
  'https://raw.githubusercontent.com/adhithirag/project_3/main/Nasa%20Data/23%20years/averaged_by_years/averaged_tempanomaly_2023.json'
];
  
Promise.all(files.map(url =>
  fetch(url).then(response => response.json()))).then(data => {
  start(data);
})
.catch(error => console.error('Error loading files:', error));

function start(data){
  let yearlyData = data;
  let year00 = yearlyData[0];
  let year01 = yearlyData[1];
  let year02 = yearlyData[2];
  let year03 = yearlyData[3];
  let year04 = yearlyData[4];
  let year05 = yearlyData[5];
  let year06 = yearlyData[6];
  let year07 = yearlyData[7];
  let year08 = yearlyData[8];
  let year09 = yearlyData[9];
  let year10 = yearlyData[10];
  let year11 = yearlyData[11];
  let year12 = yearlyData[12];
  let year13 = yearlyData[13];
  let year14 = yearlyData[14];
  let year15 = yearlyData[15];
  let year16 = yearlyData[16];
  let year17 = yearlyData[17];
  let year18 = yearlyData[18];
  let year19 = yearlyData[19];
  let year20 = yearlyData[20];
  let year21 = yearlyData[21];
  let year22 = yearlyData[22];
  let year23 = yearlyData[23];
  console.log("hi");
  const latIncrement = 0.25; // Placeholder, as original data doesn't vary by lat
  const lonIncrement = 0.125;
  const extrapolatedData = extrapolatePoints(year23.tempanomaly, latIncrement, lonIncrement);
  readyData = toArray(extrapolatedData);
  const normalizedDataPoints = readyData.map(point => {
    const normalizedIntensity = (point[2] + 2.5) / 5; // Normalizing intensity
    //console.log("actual " + point[2]);
    //console.log("normal " + normalizedIntensity);
    return [point[0], point[1], normalizedIntensity];
  });
  console.log(normalizedDataPoints);
  let average = calculateAverageIntensity(year23.tempanomaly);
  console.log(average);
  // Create a heat layer for positive values with a specific gradient
  var heat = L.heatLayer(normalizedDataPoints, {
    gradient: {
      0.0: 'darkblue', // -10
      0.25: 'lime',    // -5
      0.5: 'white',    // 0
      0.75: 'yellow',  // 5
      1.0: 'darkred'   // 10
    },
    maxZoom:5,
    blur: 75,
    size: 50,
    max: 0.672204201918784, // Ensure your data is normalized to the [0,1] range
  }).addTo(myMap);

}

function calculateAverageIntensity(data) {
  if (!Array.isArray(data) || data.length === 0) {
      console.error('Data is not an array or is empty.');
      return 0; // Return 0 or handle as appropriate for your application
  }

  const sum = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value;
  }, 0);

  const average = sum / data.length;
  return average;
}

function extrapolatePoints(data, latIncrement, lonIncrement) {
  const extrapolatedData = [];
  data.forEach((point, index) => {
      // Add the current point
      extrapolatedData.push(point);

      // Check if there's a next point to extrapolate towards
      if (index < data.length - 1) {
          const nextPoint = data[index + 1];
          const latSteps = Math.abs(nextPoint.lat - point.lat) / latIncrement;
          const lonSteps = Math.abs(nextPoint.lon - point.lon) / lonIncrement;
          const maxSteps = Math.max(latSteps, lonSteps);

          // Generate intermediate points
          for (let step = 1; step <= maxSteps; step++) {
              const newLat = point.lat + (latIncrement * step * (latSteps > 0 ? Math.sign(nextPoint.lat - point.lat) : 0));
              const newLon = point.lon + (lonIncrement * step * (lonSteps > 0 ? Math.sign(nextPoint.lon - point.lon) : 0));
              
              // Prevent adding points beyond the next point
              if (Math.abs(newLon) <= Math.abs(nextPoint.lon)) {
                  extrapolatedData.push({
                      lat: newLat,
                      lon: newLon,
                      value: point.value // Assuming constant value for simplicity
                  });
              }
          }
      }
  });

  return extrapolatedData;
};

function toArray(data){
  let returnedArray = [];
  //console.log("hi2");
  //console.log(data.tempanomaly[0].lat);
  //console.log(data.tempanomaly.length);
  //console.log(data.tempanomaly);
  for (let row = 0; row <data.length; row++){
    returnedArray.push([data[row].lat, data[row].lon, data[row].value]);
  }
  return returnedArray;
};

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


// addDropDown();

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
//     };
//     return div;
//   };

//   customControl.addTo(myMap); // Add the custom control to your map
// }


// //requestMarkers(2020);

// function renderMarkers(data) {
//  // L.clearLayers();
//   L.geoJson(data, {
//     style: function (feature) {
//       return {
//         color: "red",
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     }
//   }).addTo(myMap);
// }

// // Perform a GET request to the query URL/
// function requestMarkers(year){
//   d3.json(`${queryUrl}/${year}`).then(function (data) {
//     renderMarkers(data);
//   });

// }


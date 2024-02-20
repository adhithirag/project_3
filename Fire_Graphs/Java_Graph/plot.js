// Function to load CSV and create plot
function loadCSVAndCreatePlot(csvFile, targetDiv) {
    Plotly.d3.csv(csvFile, function (err, data) {
        if (err) {
            console.error('Error loading CSV:', err);
            return;
        }

        // Filter data for years between 2000 and 2022
        var filteredData = data.filter(function (row) {
            var year = parseInt(row['YEAR_']);
            return year >= 2000 && year <= 2022;
        });

        // Extract unique years
        var years = [...new Set(filteredData.map(row => parseInt(row['YEAR_'])))].sort();

        // Create an array to hold traces for each year
        var traces = [];

        // Iterate over each year
        years.forEach(function (year) {
            // Filter data for the current year
            var yearData = filteredData.filter(function (row) {
                return parseInt(row['YEAR_']) === year;
            });

            // Extract unique fire names for the current year
            var fireNames = [...new Set(yearData.map(row => row['FIRE_NAME']))];

            // Create a trace for each fire name
            fireNames.forEach(function (fireName, index) {
                var fireData = yearData.filter(function (row) {
                    return row['FIRE_NAME'] === fireName;
                });

                // Create an array of fire names for x-axis labels
                var xLabels = Array(fireData.length).fill(fireName);

                // Create a scatter trace for the current year and fire name
                traces.push({
                    x: xLabels, // Use fire names as x-axis labels
                    y: fireData.map(row => row['GIS_ACRES']), // Y-axis: Acreage Burned
                    mode: 'markers',
                    type: 'scatter',
                    name: year + ' - ' + fireName, // Trace name: Year - Fire Name
                    visible: false, // Initially hide traces
                    showlegend: true // Ensure trace appears in legend
                });
            });
        });

        // Read the style JSON file
        Plotly.d3.json('style.js', function (err, style) {
            if (err) {
                console.error('Error loading style JSON:', err);
                return;
            }

            // Define the layout using the style options
            var layout = {
                title: {
                    text: 'Acreage Burned From 2000-2022',
                    font: {
                        family: 'Arial',
                        size: 24
                    }
                },
                xaxis: style.xaxis,
                yaxis: style.yaxis,
                showlegend: true,
                legend: style.legend,
                margin: style.margin,
                plot_bgcolor: style.plot_bgcolor,
                updatemenus: [{
                    buttons: years.map(function (year) {
                        return {
                            label: year.toString(),
                            method: 'update',
                            args: [{
                                visible: traces.map(trace => trace.name.startsWith(year)) // Show traces for selected year
                            }, {
                                'title.text': 'Acreage Burned In ' + year
                            }]
                        };
                    }),
                    direction: 'down',
                    showactive: true,
                    x: 0.5,
                    y: 1.15
                }]
            };

            // Set initial visibility for the traces of the first year
            traces.forEach(function (trace) {
                if (trace.name.startsWith(years[0])) {
                    trace.visible = true;
                }
            });

            // Adjust the size of the plot
            var config = { responsive: true };

            // Create the plot
            Plotly.newPlot(targetDiv, traces, layout, config);
        });
    });
}


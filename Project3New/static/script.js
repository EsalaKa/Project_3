// Fetch the GeoJSON data from a specific path
fetch('/static/countries.json')  
  .then(response => response.json())
  .then(data => {
    // Initialize Map
    if (!window.map || window.map === undefined) {
        window.map = L.map('mapid').setView([20, 0], 2); // Centered at a global view
    }

    // Load and style the GeoJSON data
    L.geoJson(data, {
      style: function(feature) {
          var countryName = feature.properties.ADMIN; 
          var country = countryData[countryName];
          var color = country ? getColorForIQ(country.Average_IQ) : '#dddddd'; 
          return { fillColor: color, weight: 2, opacity: 1, color: 'white', fillOpacity: 0.7 };
      },
      onEachFeature: function(feature, layer) {
          var countryName = feature.properties.ADMIN; 
          var info = countryData[countryName] ?
                     countryName + '<br>Average IQ: ' + countryData[countryName].Average_IQ :
                     countryName + '<br>Average IQ: N/A';
          layer.bindPopup(info);
      }
    }).addTo(window.map);

    // Add or update the legend
    if (!window.legend || window.legend === undefined) {
        window.legend = L.control({position: 'bottomright'});

        window.legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 90, 100],
            labels = ['Low IQ (0-89)', 'Medium IQ (90-99)', 'High IQ (100+)'],
            colors = ['#ffffcc', '#78c679', '#006837'];

            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    labels[i] + '<br>';
            }

            return div;
        };

        window.legend.addTo(window.map);
    }

    function getColorForIQ(iq) {
        if (iq >= 100) return '#006837';
        else if (iq >= 90) return '#78c679';
        else return '#ffffcc';
    }

    // Initialize Chart.js for IQ-Literacy Correlation
    var iqLiteracyCtx = document.getElementById('iq-literacy-chart').getContext('2d');
    var iqLiteracyChart = new Chart(iqLiteracyCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'IQ vs Literacy',
                data: Object.values(countryData).map(country => ({
                    x: country.Average_IQ,
                    y: country.Literacy_Percentage
                })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Average IQ'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Literacy Percentage'
                    }
                }
            }
        }
    });

    // Initialize Chart.js for Education-Nobel Correlation
    var educationNobelCtx = document.getElementById('education-nobel-chart').getContext('2d');
    var educationNobelChart = new Chart(educationNobelCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Education vs Nobel Prize Winners',
                data: Object.values(countryData).map(country => ({
                    x: country.Average_School_Education,
                    y: country.Cumulative_Nobel_Prize
                })),
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Average School Education'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nobel Prize Winners'
                    }
                }
            }
        }
    });

    
    function generateContinentDatasets() {
        var continents = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
        var continentData = [];
        continents.forEach(continent => {
            var countriesInContinent = Object.values(countryData)
                                             .filter(country => country.continent === continent);
            if (countriesInContinent.length > 0) {
                var averageIQ = countriesInContinent.reduce((sum, country) => sum + country.Average_IQ, 0) / countriesInContinent.length;
                continentData.push({
                    label: continent,
                    data: [{ x: continent, y: averageIQ }],
                    backgroundColor: getRandomColor()
                });
            }
        });
        return continentData;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to update visualizations based on selected country
    function updateVisualizations(countryName) {
        var data = countryData[countryName];
        if (data) {
            var infoDiv = document.getElementById('country-info');
            infoDiv.innerHTML = 'Country: ' + countryName + '<br>' +
                                'Average IQ: ' + data.Average_IQ + '<br>' +
                                'Literacy Percentage: ' + data.Literacy_Percentage + '<br>' +
                                'Nobel Prize Winners: ' + data.Cumulative_Nobel_Prize + '<br>' +
                                'Average School Education: ' + data.Average_School_Education + '<br>' +
                                'HDI: ' + data.HDI + '<br>' +
                                'Population: ' + data.Population + '<br>' +
                                'Continent: ' + data.Continent + '<br>' +
                                'GNI: ' + data.GNI;
        }
    }

    // Dropdown event listener
    document.getElementById('country-dropdown').addEventListener('change', function() {
        var countryName = this.value;
        updateVisualizations(countryName);
    });

  })
  .catch(error => console.error('Error loading GeoJSON data:', error)); //The .catch() method is used to handle  errors that might occur during the fetching process.






                           





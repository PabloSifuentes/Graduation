google.charts.load('current', {
    'packages': ['geochart'],
    // Note: Because this chart requires geocoding, you'll need mapsApiKey.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Estado', 'Valor'],
        ['BR-AC', 10], // Acre
        ['BR-AL', 20], // Alagoas
        ['BR-AP', 30], // Amapá
        ['BR-AM', 40], // Amazonas
        ['BR-BA', 50], // Bahia
        ['BR-CE', 60], // Ceará
        ['BR-DF', 70], // Distrito Federal
        ['BR-ES', 80], // Espírito Santo
        ['BR-GO', 90], // Goiás
        ['BR-MA', 100], // Maranhão
        ['BR-MT', 110], // Mato Grosso
        ['BR-MS', 120], // Mato Grosso do Sul
        ['BR-MG', 130], // Minas Gerais
        ['BR-PA', 140], // Pará
        ['BR-PB', 150], // Paraíba
        ['BR-PR', 160], // Paraná
        ['BR-PE', 170], // Pernambuco
        ['BR-PI', 180], // Piauí
        ['BR-RJ', 190], // Rio de Janeiro
        ['BR-RN', 200], // Rio Grande do Norte
        ['BR-RS', 210], // Rio Grande do Sul
        ['BR-RO', 220], // Rondônia
        ['BR-RR', 230], // Roraima
        ['BR-SC', 240], // Santa Catarina
        ['BR-SP', 250], // São Paulo
        ['BR-SE', 260], // Sergipe
        ['BR-TO', 270]  // Tocantins
    ]);

    var options = {
        region: 'BR',
        resolution: 'provinces',
        displayMode: 'regions',
        colorAxis: { colors: ['#F4F8FC', '#D5E5F2', '#A9CDE3', '#76B1D2', '#3987BD', '#1764A5', '#104B87', '#083B70'] },
        backgroundColor: '#E5E7EB',
        datalessRegionColor: '#9CA3AF',
        defaultColor: '#000000',
        legend: {
            textStyle: {
                color: '#333333',
            }
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
    chart.draw(data, options);
};

const mapa = L.map('mapa');


google.charts.load('current', {'packages':['annotationchart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Kepler-22b mission');
        data.addColumn('string', 'Kepler title');
        data.addColumn('string', 'Kepler text');
        data.addColumn('number', 'Gliese 163 mission');
        data.addColumn('string', 'Gliese title');
        data.addColumn('string', 'Gliese text');
        data.addRows([
          [new Date(2314, 2, 15), 12400, undefined, undefined,
                                  10645, undefined, undefined],
          [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter',
                                  12374, undefined, undefined],
          [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall',
                                  15766, 'Gallantors', 'First Encounter'],
          [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!',
                                  34334, 'Gallantors', 'Statement of shared principles'],
          [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties',
                                  66467, 'Gallantors', 'Mysteries revealed'],
          [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost',
                                  79463, 'Gallantors', 'Omniscience achieved']
        ]);

        var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));

        var options = {
          displayAnnotations: true
        };

        chart.draw(data, options);
      }
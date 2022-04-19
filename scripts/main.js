mapboxgl.accessToken = '<token>';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-83.4702, 42.3714],
    zoom: 14 // starting zoom
});
var clickedStateId = null;
var popup = new mapboxgl.Popup();
map.on('load', function () {
    map.addSource('plymouth_roads', {
        type: 'geojson',
        data: '../geojson/plymouth_roads.geojson',
        generateId: true
    });
    map.addLayer({
        'id': 'plymouth_roads',
        'type': 'line',
        'source': 'plymouth_roads',
        'paint': {
            'line-width': 5,
            'line-opacity': 0.6,
            'line-color': [
                'case',
                ['boolean', ['feature-state', 'clicked'], false],
                '#f50',
                '#03f' // blue
            ]
        },
        'filter': ['==', '$type', 'LineString']
    });
    map.on('click', 'plymouth_roads', function (e) {
        // Change the clicked road back to its unclicked color
        if (clickedStateId !== null) {
            map.setFeatureState({ source: 'plymouth_roads', id: clickedStateId }, { clicked: false });
        }
        // Save the id of the currently clicked road
        clickedStateId = e.features[0].id;
        // Change the color of a clicked road so it stands out        
        map.setFeatureState({ source: 'plymouth_roads', id: clickedStateId }, { clicked: true });
        var expectedStreetName = e.features[0].properties.name;
        var streetNameElement = document.getElementById('streetName');
        streetNameElement.pattern = expectedStreetName;
        // Add a popup to the road when the hint button is clicked to help the user
        // figure out what the answer is
        popup.setLngLat(e.lngLat).setHTML(expectedStreetName);
        document.getElementById('hint').onclick = function () {
            popup.addTo(map);
        };
    });
    // Change the cursor to a pointer when the it enters a feature in the 'plymouth_roads' layer.
    map.on('mouseenter', 'plymouth_roads', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'plymouth_roads', function () {
        map.getCanvas().style.cursor = '';
    });
});

mapboxgl.accessToken = '<token>';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/latitude98/ckd1vvqgy2e0h1imt9rvcl10u',
    center: [-83.460322, 42.368072],
    zoom: 11 });

var highlightId = null;

map.on('load', function() {

    map.addSource('plymouth', {
        'type': 'geojson',
        'data': 'https://rwerthman.github.io/data/plymouth.geojson',
        'generateId': true  });

    map.addLayer({
        'id': 'plymouth',
        'type': 'line',
        'source': 'plymouth',
        'paint': {
        'line-color': '#888',
        'line-width': [
            'case',
            ['boolean', ['feature-state', 'highlight'], false],
            10,
            2
            ]
        },
        'filter': ['==', '$type', 'LineString'] });

    map.addSource('northglenn', {
        'type': 'geojson',
        'data': 'https://rwerthman.github.io/data/northglenn.geojson',
        'generateId': true });

    map.addLayer({
        'id': 'northglenn',
        'type': 'line',
        'source': 'northglenn',
        'paint': {
        'line-color': '#888',
        'line-width': [
            'case',
            ['boolean', ['feature-state', 'highlight'], false ],
            10,
            2
            ]
        },
        'filter': ['==', '$type', 'LineString'] });

    map.on('click', 'plymouth', function(e) {
        var description = e.features[0].properties.name;

        if( highlightId )
        {
            map.setFeatureState({
            source: 'plymouth',
            id: highlightId,
                }, {
                    highlight: false
            });
        }

        highlightId = e.features[0].id;
    
        map.setFeatureState({
        source: 'plymouth',
        id: highlightId,
            }, {
                highlight: true
        });
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
    });
 
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'plymouth', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
    
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'plymouth', function() {
    map.getCanvas().style.cursor = '';
    });

    map.on('click', 'northglenn', function(e) {
        var description = e.features[0].properties.name;
        map.setFeatureState({
        source: 'northglenn',
        id: e.features[0].id,
            }, {
                highlight: true
        });
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
    });
 
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'northglenn', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
    
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'northglenn', function() {
    map.getCanvas().style.cursor = '';
    });
});

var cities = document.getElementById('city');

cities.addEventListener('change', function() {
    switch( this.value ) {
        case "plymouth":
            map.flyTo({
                center: [-83.460322, 42.368072],
                zoom: 11 });
            break;
        case "northglenn":
            map.flyTo({
                center: [-104.981222, 39.897122],
                zoom: 11 });
            break;
    }
});
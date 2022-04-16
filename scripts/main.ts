mapboxgl.accessToken = '<token>';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-83.4702, 42.3714], // starting position [lng, lat]
    zoom: 14 // starting zoom
});

let clickedStateId = null;

map.on('load', () => {
    
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
                '#f50', // orange
                '#03f' // blue
            ]            
        },
        'filter': ['==', '$type', 'LineString']
    });

    map.on('click', 'plymouth_roads', (e) => {

        // Change the clicked road back to its unclicked color
        if (clickedStateId !== null) {
            map.setFeatureState(
                { source: 'plymouth_roads', id: clickedStateId },
                { clicked: false }
            );
        }

        // Save the id of the currently clicked road
        clickedStateId = e.features[0].id;

        // Change the color of a clicked road so it stands out        
        map.setFeatureState(
            { source: 'plymouth_roads', id: clickedStateId },
            { clicked: true }
        );

        // Add a popup to the road when it is clicked
        const name = e.features[0].properties.name;
        const popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(name)
            .addTo(map);        
    });

    // Change the cursor to a pointer when the it enters a feature in the 'plymouth_roads' layer.
    map.on('mouseenter', 'plymouth_roads', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'plymouth_roads', () => {
        map.getCanvas().style.cursor = '';
    });

});

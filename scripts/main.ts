mapboxgl.accessToken = 'pk.eyJ1IjoibGF0aXR1ZGU5OCIsImEiOiJjbDF6N3NrdDgwMW5uM2VwNnB3MjJoZGJhIn0.LaHND5ulTYyHOEblUg9MwA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-83.4702, 42.3714], // starting position [lng, lat]
    zoom: 14 // starting zoom
});

map.on('load', () => {
    
    map.addSource('plymouth_roads', {
        type: 'geojson',
        data: '../geojson/plymouth_roads.geojson'
    });

    map.addLayer({
        'id': 'plymouth_roads',
        'type': 'line',
        'source': 'plymouth_roads',
        'paint': {
            'line-color': '#03f', // @todo: use #f50 for orange color for on clicked like overpass-turbo.eu
            'line-width': 5,
            'line-opacity': 0.6
        },
        'filter': ['==', '$type', 'LineString']
    });

});

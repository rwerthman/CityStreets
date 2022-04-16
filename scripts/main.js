mapboxgl.accessToken = 'pk.eyJ1IjoibGF0aXR1ZGU5OCIsImEiOiJjbDF6N3NrdDgwMW5uM2VwNnB3MjJoZGJhIn0.LaHND5ulTYyHOEblUg9MwA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-83.4702, 42.3714],
    zoom: 14 // starting zoom
});
map.on('load', function () {
    map.addSource('plymouth_roads', {
        type: 'geojson',
        data: '../geojson/plymouth_roads.geojson'
    });
    map.addLayer({
        'id': 'plymouth_roads',
        'type': 'line',
        'source': 'plymouth_roads',
        'paint': {
            'line-color': '#03f',
            'line-width': 5,
            'line-opacity': 0.6
        },
        'filter': ['==', '$type', 'LineString']
    });
});

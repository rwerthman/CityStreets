mapboxgl.accessToken = 'pk.eyJ1IjoibGF0aXR1ZGU5OCIsImEiOiJjbDF6N3NrdDgwMW5uM2VwNnB3MjJoZGJhIn0.LaHND5ulTYyHOEblUg9MwA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

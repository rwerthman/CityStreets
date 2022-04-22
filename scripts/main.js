mapboxgl.accessToken = '<token>';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-83.4702, 42.3714],
    zoom: 14 // starting zoom
});
var clickedStateId = null;
var clickedPlaceStateId = null;
var popup = new mapboxgl.Popup();
function setNameAndHint(e) {
    var expectedName = e.features[0].properties.name;
    var nameElement = document.getElementById('name');
    // Check the user input as they type to see if it matches
    // the feature they clicked on
    nameElement.oninput = function () {
        if (nameElement.value.length === 0) {
            nameElement.className = '';
            return;
        }
        else if (nameElement.value.toLowerCase() !== expectedName.toLowerCase()) {
            nameElement.className = 'invalid';
        }
        else {
            nameElement.className = 'valid';
        }
    };
    // Add a popup to the feature when the hint button is clicked to help the user
    // figure out what the answer is
    popup.setLngLat(e.lngLat).setHTML(expectedName);
    // Provide the user a hint if they can't remember the name of the
    // feature
    document.getElementById('hint').onclick = function () {
        popup.addTo(map);
    };
}
function setMouseEnterAndLeave(source) {
    // Change the cursor to a pointer when the it enters a feature in the layer.
    map.on('mouseenter', source, function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', source, function () {
        map.getCanvas().style.cursor = '';
    });
}
function removePlaces() {
    if (map.getLayer('plymouth_places_outline')) {
        map.removeLayer('plymouth_places_outline');
    }
    if (map.getLayer('plymouth_places')) {
        map.removeLayer('plymouth_places');
    }
    if (map.getSource('plymouth_places')) {
        map.removeSource('plymouth_places');
    }
}
function addPlaces() {
    if (map.getSource('plymouth_places') === undefined) {
        map.addSource('plymouth_places', {
            type: 'geojson',
            data: '../geojson/plymouth_places.geojson',
            generateId: true
        });
        setMouseEnterAndLeave('plymouth_places');
    }
    if (map.getLayer('plymouth_places') === undefined) {
        // Add a new layer to visualize the polygon.
        map.addLayer({
            'id': 'plymouth_places',
            'type': 'fill',
            'source': 'plymouth_places',
            'paint': {
                // 'fill-color': '#fc0',
                'fill-color': [
                    'case',
                    ['boolean', ['feature-state', 'clicked'], false],
                    '#f50',
                    '#fc0' // yellow
                ],
                'fill-opacity': 0.3
            },
            'filter': ['has', 'name']
        });
        // When a click event occurs on a feature in the states layer,
        // open a popup at the location of the click, with description
        // HTML from the click event's properties.
        map.on('click', 'plymouth_places', function (e) {
            // Change the clicked place back to its unclicked color
            if (clickedPlaceStateId !== null) {
                map.setFeatureState({ source: 'plymouth_places', id: clickedPlaceStateId }, { clicked: false });
            }
            // Save the id of the currently clicked place
            clickedPlaceStateId = e.features[0].id;
            // Change the color of a clicked road so it stands out        
            map.setFeatureState({ source: 'plymouth_places', id: clickedPlaceStateId }, { clicked: true });
            setNameAndHint(e);
        });
    }
    if (map.getLayer('plymouth_places_outline') === undefined) {
        // Add an outline around the polygon.
        map.addLayer({
            'id': 'plymouth_places_outline',
            'type': 'line',
            'source': 'plymouth_places',
            'paint': {
                // 'line-color': '#03f',
                'line-color': [
                    'case',
                    ['boolean', ['feature-state', 'clicked'], false],
                    '#f50',
                    '#03f' // blue
                ],
                'line-width': 2,
                'line-opacity': 0.7
            },
            'filter': ['has', 'name']
        });
    }
}
function removeStreets() {
    if (map.getLayer('plymouth_streets')) {
        map.removeLayer('plymouth_streets');
    }
    if (map.getSource('plymouth_streets')) {
        map.removeSource('plymouth_streets');
    }
}
function addStreets() {
    if (map.getSource('plymouth_streets') === undefined) {
        map.addSource('plymouth_streets', {
            type: 'geojson',
            data: '../geojson/plymouth_streets.geojson',
            generateId: true
        });
        setMouseEnterAndLeave('plymouth_streets');
    }
    if (map.getLayer('plymouth_streets') === undefined) {
        map.addLayer({
            'id': 'plymouth_streets',
            'type': 'line',
            'source': 'plymouth_streets',
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
        map.on('click', 'plymouth_streets', function (e) {
            // Change the clicked road back to its unclicked color
            if (clickedStateId !== null) {
                map.setFeatureState({ source: 'plymouth_streets', id: clickedStateId }, { clicked: false });
            }
            // Save the id of the currently clicked road
            clickedStateId = e.features[0].id;
            // Change the color of a clicked road so it stands out        
            map.setFeatureState({ source: 'plymouth_streets', id: clickedStateId }, { clicked: true });
            setNameAndHint(e);
        });
    }
}
map.on('load', function () {
    var streetCheckBox = document.getElementById('streets');
    streetCheckBox.addEventListener('click', function (e) {
        var element = e.target;
        if (element.checked) {
            addStreets();
        }
        else {
            removeStreets();
        }
    });
    var placesCheckBox = document.getElementById('places');
    placesCheckBox.addEventListener('click', function (e) {
        var element = e.target;
        if (element.checked) {
            addPlaces();
        }
        else {
            removePlaces();
        }
    });
});

# Currently being rewritten in using MapBox and OpenStreetMaps
Previously was written using Google Maps API but that is no longer free.

# GIF of usage
![](citystreets.gif)


# Notes on adding OpenStreetMap data
Download osm data from OpenStreetMap.org

Convert the osm to geojson
```
node_modules/osmtogeojson/osmtogeojson map.osm > plymouth.geojson
```

Upload the geojson to a web address and put the web address in the html to show the geojson

# Features that need to be implemented
- [ ] Add token to hmtl
- [ ] Add map tile style to hmtl
- [ ] Highlight street when hovering or clicking on it
- [ ] Add input to check streetname
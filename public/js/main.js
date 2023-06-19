mapboxgl.accessToken =
  "pk.eyJ1IjoidHo5MjQiLCJhIjoiY2xoc2dnemo5MDdqZTN0bDNtOTg1eXA3OCJ9.CCj0nebLyXpIn9JfHc02qQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/tz924/clj0vwgsr00o801pwalb18zye", // style URL
  center: [-114.2634, 38.93], // starting position [lng, lat]
  zoom: 2, // starting zoom
  projection: "globe",
});

map.on("style.load", () => {
  map.setFog({
    color: "rgb(186, 210, 235)", // Lower atmosphere
    "high-color": "rgb(36, 92, 223)", // Upper atmosphere
    "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    "space-color": "rgb(11, 11, 25)", // Background color
    "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
  });
});

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.ScaleControl({
    maxWidth: 150,
    unit: "imperial",
  })
);

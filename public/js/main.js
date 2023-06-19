// Constants for the map
const BRYCE_CANYON = [-112.187, 37.593];
const GREAT_BASIN = [-114.2634, 38.93];

const parks = [
  {
    id: "bryce-canyon",
    name: "Bryce Canyon",
    coordinates: [-112.187, 37.593],
    groves: 7,
    acres: 1361.08,
    link: "/map/brca",
  },
  {
    id: "great-basin",
    name: "Great Basin",
    coordinates: [-114.2634, 38.93],
    groves: 12,
    acres: 1794.64,
    link: "/map/grba",
  },
];

// Mapbox GL JS code
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

// Array to hold all the markers
const markers = [];

// Loop through the array and add a marker and popup for each park
for (let park of parks) {
  // Create a marker
  const marker = new mapboxgl.Marker().setLngLat(park.coordinates).addTo(map);

  // Create a popup
  const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<div style="border-radius: 0.25rem; padding: 1rem; width: 200px; background-color: #fff; color: #000;">
    <h4 style="margin-bottom: 0.75rem;">${park.name} National Park</h4>
    <ul style="list-style-type: none; padding-left: 0;">
      <li>${park.groves} Groves</li>
      <li>${park.acres} Acres</li>
    </ul>
    <a href="${park.link}" style="color: #fff; background-color: #0d6efd; border-color: #0d6efd; display: inline-block; text-align: center; vertical-align: middle; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;">More info</a>
  </div>`
  );

  // Add the popup to the marker
  marker.setPopup(popup);

  // Add the marker to the array
  markers.push(marker);

  document.getElementById(park.id).addEventListener("click", () => {
    // Close all other popups
    for (let otherMarker of markers) {
      otherMarker.getPopup().remove();
    }

    // Fly to the park and open its popup
    map.flyTo({ center: park.coordinates, zoom: 12 });
    marker.getPopup().addTo(map);
  });
}

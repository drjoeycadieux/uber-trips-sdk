mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2xwbGR4bmNqMDNmcDJqcGV1OXY4Z2hteiJ9.yMegQFr9KWFFEsgmdbFRyg";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-73.5673, 45.5017], // Montreal coordinates (adjust as needed)
  zoom: 12,
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  }),
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// disable map zoom when using scroll
map.scrollZoom.disable();

const uberApiUrl = "https://api.uber.com/v1/guests/trips/{}";
const uberApiKey = "dfH0ruu2OVrUwMqRFa4YecgIT6aGOvDh6T5YavaT";
const applicationId = "qilcHm9aDOECPNDdji11DOlCM0pg6FlA";

// Fetch data from Uber API
fetch(uberApiUrl, {
  headers: {
    Authorization: `Bearer ${uberApiKey}`,
    "Content-Type": "application/json",
    "Uber-User-Agent": `UberSDK/${applicationId}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Process the Uber API response and display on the map
    console.log(data);

    // Add your logic to process the Uber API data and display on the map
    data.trips.forEach((trip) => {
      // Assuming each trip has a latitude and longitude
      const { latitude, longitude } = trip.location;

      // Create a Mapbox marker for each trip
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    });
  })
  .catch((error) => {
    console.error("Error fetching Uber data:", error);
  });

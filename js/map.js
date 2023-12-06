mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2xwbGR4bmNqMDNmcDJqcGV1OXY4Z2hteiJ9.yMegQFr9KWFFEsgmdbFRyg";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-73.5673, 45.5017], // Montreal coordinates (adjust as needed)
  zoom: 12,
});

// disable map zoom when using scroll
map.scrollZoom.disable();

const uberApiKey = "dfH0ruu2OVrUwMqRFa4YecgIT6aGOvDh6T5YavaT";
const uberApiUrl = "https://api.uber.com/v1/guests/trips/{}";

// Fetch data from Uber API
fetch(uberApiUrl, {
  headers: {
    Authorization: `Bearer ${uberApiKey}`,
    "Content-Type": "application/json",
  },
  mode: "cors",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data.trips.forEach((trip) => {
      const { latitude, longitude } = trip.location;

      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    });
  })
  .catch((error) => {
    console.error("Error fetching Uber data:", error);
  });

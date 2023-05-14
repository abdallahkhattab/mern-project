import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';


function DistanceCalculator() {
  const [latitude1, setLatitude1] = useState('');
  const [longitude1, setLongitude1] = useState('');
  const [latitude2, setLatitude2] = useState('');
  const [longitude2, setLongitude2] = useState('');
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Initialize the TomTom Maps SDK
    const map = tt.map({
      key: 'y58ujcEGCf8tL5EsHCpXhKkeQSYJRv7s',
      container: 'map-container',
      style: 'https://api.tomtom.com/maps-sdk-js/4.58.0/examples/sdk/examples.css',
    });

    // Create TomTom LatLng objects
    const position1 = new tt.LngLat(longitude1, latitude1);
    const position2 = new tt.LngLat(longitude2, latitude2);

    // Calculate the distance using TomTom's distanceTo() method
    const calculatedDistance = position1.distanceTo(position2) / 1000; // Convert from meters to kilometers

    // Set the distance state variable
    setDistance(calculatedDistance);

    // Add markers to the map
    const marker1 = new tt.Marker().setLngLat(position1).addTo(map);
    const marker2 = new tt.Marker().setLngLat(position2).addTo(map);

    // Fit the map to show both markers
    map.fitBounds([position1, position2], { padding: 100 });

    // Cleanup the map when the component is unmounted
    return () => map.remove();
  }, [latitude1, longitude1, latitude2, longitude2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDistance(null); // Reset the distance when the form is submitted
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="latitude1">Latitude 1:</label>
        <input
          type="text"
          id="latitude1"
          value={latitude1}
          onChange={(e) => setLatitude1(e.target.value)}
          required
        />

        <label htmlFor="longitude1">Longitude 1:</label>
        <input
          type="text"
          id="longitude1"
          value={longitude1}
          onChange={(e) => setLongitude1(e.target.value)}
          required
        />

        <label htmlFor="latitude2">Latitude 2:</label>
        <input
          type="text"
          id="latitude2"
          value={latitude2}
          onChange={(e) => setLatitude2(e.target.value)}
          required
        />

        <label htmlFor="longitude2">Longitude 2:</label>
        <input
          type="text"
          id="longitude2"
          value={longitude2}
          onChange={(e) => setLongitude2(e.target.value)}
          required
        />

        <button type="submit">Calculate Distance</button>
      </form>

      <div id="map-container" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>

      {distance && (
        <p>
          The distance between the two places is approximately {distance} kilometers.
        </p>
      )}
    </div>
  );
}

export default DistanceCalculator;

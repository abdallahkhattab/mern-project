import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./Register/LogIn";
import SignIn from "./Register/SignIn";
import NavBar from "./Register/NavBar";
import * as React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Navbar,
  NavbarBrand,
} from "reactstrap";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const MAX_ZOOM = 17;

function App() {
 
  const mapElement = useRef();
  const [mapLongitude] = useState(34.3333);
  const [mapLatitude] = useState(31.4167);
  const [mapZoom] = useState(10);
  const [map, setMap] = useState({});

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let map = tt.map({
      /* 
      This key will API key only works on this Stackblitz. To use this code in your own project,
      sign up for an API key on the TomTom Developer Portal.
      */
      key: "y58ujcEGCf8tL5EsHCpXhKkeQSYJRv7s",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    let marker = new tt.Marker()
      .setLngLat([mapLongitude, mapLatitude])
      .addTo(map);
    map.on("click", (e) => {
      // Update the position of the marker to the location of the click
      marker.setLngLat(e.lngLat);
    });

    setMap(map);
    return () => map.remove();
  }, []);

  const handleSearch = async () => {
    // Get the search term from the input field
    const searchTerm = document.getElementById("search").value;

    try {
      // Call the TomTom Search API to get the search results
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
          searchTerm
        )}.json?key=y58ujcEGCf8tL5EsHCpXhKkeQSYJRv7s`
      );
      const data = await response.json();

      // Set the search results to the state variable
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Add a marker for each search result
    searchResults.forEach((result) => {
      const marker = new tt.Marker().setLngLat(result.position).addTo(map);
    });

    // Remove all markers when the search results change
    return () => {
      map.getLayer("markerLayer").remove();
    };
  }, [searchResults]);

  return (
    // <div className="App">
    //   <NavBar />
    //   <div ref={mapElement} className="mapDiv" />
    // </div>
  <BrowserRouter>
          <div className="App">
          <NavBar />
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signin" element={<SignIn />} /> 
            </Routes>
            <div ref={mapElement} className="mapDiv" />
          </div>
  </BrowserRouter>

  );
}
export default App;

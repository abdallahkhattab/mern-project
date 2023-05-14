import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./Register/LogIn";
import Register from "./Register/Register";
import NavBar from "./Register/NavBar";
import Map from "./Register/Map";
import MapAndNav from "./Register/MapAndNav";
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import DistanceCalculator from "./Register/distance";

const MAX_ZOOM = 17;

function App() {
  const mapElement = useRef();
  const [mapLongitude] = useState(34.3333);
  const [mapLatitude] = useState(31.4167);
  const [mapZoom] = useState(10);
  const [map, setMap] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Add a marker for each search result
    searchResults.forEach((result) => {
      const marker = new tt.Marker().setLngLat(result.position).addTo(map);
    });

    // Remove all markers when the search results change
    return () => {
      // map.getLayer("markerLayer").remove();
    };
  }, [searchResults]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/distance" element={<DistanceCalculator />} />

          <Route path="/login/Register" element={<Register />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map" element={<Map />} />


        </Routes>
        <div ref={mapElement} className="mapDiv" />
      </div>
    </BrowserRouter>
  );
}

export default App;

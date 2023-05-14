import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Autocomplete from "react-autocomplete";

import * as React from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentForm, setCurrentForm] = useState('index.css');
  const [userData, setUserData] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/map", {
          method: "post",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        console.log(data, "userData");
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {

    
    let map = tt.map({
      key: "y58ujcEGCf8tL5EsHCpXhKkeQSYJRv7s",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    let marker = new tt.Marker()
      .setLngLat([mapLongitude, mapLatitude])
      .addTo(map);
    map.on("click", (e) => {
      marker.setLngLat(e.lngLat);
      
    });
    setMap(map);
    return () => map.remove();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
          searchTerm
        )}.json?key=y58ujcEGCf8tL5EsHCpXhKkeQSYJRv7s`
      );
      const data = await response.json();
      setSearchResults(data.results);
      if (data.results.length > 0) {
        // remove previous markers
        map.removeObjects(map.getMarkers());
        // add new marker at first search result
        const marker = new tt.Marker().setLngLat(data.results[0].position).addTo(map);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    searchResults.forEach((result) => {
      const marker = new tt.Marker()
        .setLngLat(result.position)
        .addTo(map);
    });
    return () => {
    //  map.removeObjects(map.getMarkers());
    };
  }, [searchResults]);
/*
  componentDidMount(){
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/map", {
          method: "post",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        console.log(data, "userData");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  ;
  }*/  
  return (
    <div className="App">
      <div className="NavBar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <button>
        <a className="navbar-brand" href="distance">
            قيد التطوير
          </a>

        </button>
         
         <button>

         <a className="navbar-brand" href="favourite">
            الذهاب للمفضله
          </a>
         </button>
        
          <div>
</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" 
          style={{marginTop: "20px"}}
          >
           <div>
    </div>
           
            <FormGroup >
             
              <Autocomplete style={{  
      zindex: 9999
}}
                getItemValue={(item) => item.address.freeformAddress}
                items={searchResults}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.id}
                    style={{ background: isHighlighted ? "lightgray" : "white" }}
                  >
                    {item.address.freeformAddress}
                  </div>
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSelect={(value, item) => setSearchTerm(item.address.freeformAddress)}
              />
              <Button onClick={handleSearch} style={{marginLeft: "20px"}}>Search</Button>
            </FormGroup>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
              <button style={{ 
  display: 'inline-block',
  backgroundColor: '#FF647F',
  border: 'none',
  color:'white',
  fontSize: '16px',
  padding: '10px 20px',
  borderRadius: '20px',
  marginTop: "-10px",
  marginLeft :"20px",
  cursor: 'pointer'
}}>
  <span style={{ marginRight: '5px' }}>&#x2665;</span>
  <span>favourite</span>

</button>
<div>
<h1>{userData.fname}</h1>

</div>


              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    
      
        <Row class="map">
          

            <div ref={mapElement} className="mapDiv" style={{width:1550,height:650}}/>
         
        </Row>
     
    </div>
  );
}

export default App;

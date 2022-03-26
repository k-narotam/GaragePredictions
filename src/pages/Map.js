import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
//import 'leaflet/dist/leaflet.css';
import Navbar from "../components/Navbar";
import React from 'react';

const Map = () => {
  
  const defaultPosition = [28.600574, -81.197687]; // UCF position

  return (
    
    <div className="map__container">
    <Navbar/>
      <MapContainer center={defaultPosition} zoom={20} scrollWheelZoom={false} >
  
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.600003615431984, -81.20547129871996]}>
            <Popup>
                I am a pop-up!
            </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

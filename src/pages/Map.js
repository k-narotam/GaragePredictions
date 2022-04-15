// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon} from "leaflet";
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
// import "leaflet/dist/leaflet.css";
// import Navbar from "../components/Navbar";
// import React from 'react';

// const Map = () => {
  
//   const defaultPosition = [28.6016, -81.2005]; // UCF position
//   const customIcon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})
//   return (
    
//     <div className="map__container">
//     <Navbar/>
//       <MapContainer 
//       center={defaultPosition} 
//       zoom={17} 
//       scrollWheelZoom={true} 
//       dragging={true}
//       style={{ height: 900, width: "100%" }}>
      
      
  
//         <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

        
//         <Marker position={[28.600003615431984, -81.20547129871996]} icon={customIcon}>
//             <Popup>
//                 Garage A
//             </Popup>
//         </Marker>

//         <Marker position={[28.596890438568995, -81.20035892832448]} icon={customIcon}>
//             <Popup>
//                 Garage B
//             </Popup>
//         </Marker>

//         <Marker position={[28.602277201961225, -81.19592179707529]} icon={customIcon}>
//             <Popup>
//                 Garage C
//             </Popup>
//         </Marker>

//         <Marker position={[28.60492516940185, -81.19719043221895]} icon={customIcon}>
//             <Popup>
//                 Garage D
//             </Popup>
//         </Marker>

//         <Marker position={[28.604947958016297, -81.20115972129959]} icon={customIcon}>
//             <Popup>
//                 Garage H
//             </Popup>
//         </Marker>

//         <Marker position={[28.60111379729534, -81.20479218080769]} icon={customIcon}>
//             <Popup>
//                 Garage I
//             </Popup>
//         </Marker>

//         <Marker position={[28.596149388993762, -81.19672787522661]} icon={customIcon}>
//             <Popup>
//                 Libra Garage
//             </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;

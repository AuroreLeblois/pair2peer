// == Import npm
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { render } from 'react-dom';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { firstLetterToUppercase } from 'src/store/utils';


const myIcon = L.icon({
		iconUrl:'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
		iconSize:[25,41], // Taille de l'icon 
		iconAnchor:[12.5,50], // Pour que le marqueur reste en place 
		popupAnchor:[0,-43] // Pour mettre le popup juste au dessus du marqueur 
});

const position = [48.84664340683584,2.3455810546875]
// var markersClusterCustom = new L.MarkerClusterGroup({
//   iconCreateFunction: function(cluster) {
//     var digits = (cluster.getChildCount()+'').length;
//     return L.divIcon({ 
//         html: cluster.getChildCount(), 
//         className: 'cluster digits-'+digits,
//         iconSize: null 
//     });
// }
// });

const UserMap = () =>  {
  
    return (
   

      <Map className="map"  center={position} zoom={7}>

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        
      />

      <Marker 
      position={position}
		  icon={myIcon}
		  >
      {/* {users.map(user => (
        
        <Marker
          icon={myIcon}
          position={user.localisation}
        />
      ))}

      
      {userMarker && (
        <Popup
          position={user.localisation}
        >
          <div>
            <h2>Pseudo :{firstLetterToUppercase(user.pseudo)}</h2>
            <p>Ville : {firstLetterToUppercase(user.city)}</p>
            <p>Remote : {user.remote}</p>
          </div>
        </Popup>
      )}
       */}
      </Marker>
    </Map>
    );

  }

export default UserMap;




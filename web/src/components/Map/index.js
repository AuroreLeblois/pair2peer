// == Import npm
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './Map.css';
import { firstLetterToUppercase } from 'src/store/utils';


const myIcon = L.icon({
		iconUrl:'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
		iconSize:[25,41], // Taille de l'icon 
		iconAnchor:[12.5,50], // Pour que le marqueur reste en place 
		popupAnchor:[0,-43] // Pour mettre le popup juste au dessus du marqueur 
});

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

const UserMap = ({ users }) =>  {

  if (!users) {
    return null;
  }
  
    return (
   
      <div className="App">

      <Map className="map"  center={[48.84664340683584,2.3455810546875]} zoom={7}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
      />
    
      {users.map(user => (
        
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
      
    </Map>
      </div>
    );

  }



export default UserMap;



// Test coords 

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.setState({
  //       location: {
  //         lat:location.latitude,
  //         lng:location.longitude
  //       },
  //       haveUsersLocation:false,
  //       zoom:10
  //     });
  //   }, () => {
  //     console.log('Pas de localisation');
  //     fetch('https://ipapi.co/json')
  //     .then(res => res.json())
  //     .then(location => {
  //       console.log(location);
  //     });
  //   });
  // }

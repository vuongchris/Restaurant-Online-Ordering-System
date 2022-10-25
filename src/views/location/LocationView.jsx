/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  GoogleMap, LoadScript, MarkerF, InfoWindowF,
} from '@react-google-maps/api';
import './LocationView.css';

function LocationView({
  locations, containerStyle, activeMarker, setActiveMarker, handleActiveMarker, center, onLoad,
}) {
  return (
    <div style={{ display: 'flex', padding: '20px', textAlign: 'center' }}>
      <div style={{ flex: 1 }}>
        <h1>Map</h1>
        <LoadScript
          googleMapsApiKey="AIzaSyDVbjAei-dnyBW3YowW5l2KsDZXsrlCgn4"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={() => setActiveMarker(null)}
          >
            {locations.map(({
              id, Name, Address, Lat, Lng,
            }) => (
              <MarkerF
                onLoad={onLoad}
                key={id}
                position={{ lat: Lat, lng: Lng }}
                onClick={() => handleActiveMarker(id, Name)}
              >
                {activeMarker === id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <h4>{Name}</h4>
                      <h4>{Address}</h4>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div style={{ flex: 1, width: '100%', textAlign: 'center' }}>
        <h1>Locations</h1>
        <br></br>
        {locations.map((location, index) => (
          <div key={location.Name}>
            <button onClick={() => handleActiveMarker(location.id, location.Name)} style={{ margin: '10px', padding: '20px' }}>
              <h2>
                {index + 1}
                {' '}
                {location.Name}
              </h2>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationView;

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  GoogleMap, LoadScript, MarkerF, InfoWindowF,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router';

function LocationView({
  locations, containerStyle, activeMarker, setActiveMarker, handleActiveMarker, center, onLoad,
}) {
  const navigation = useNavigate();
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
              id, restaurantBranch, Location, Hours, pickUp, Lat, Lng,
            }) => (
              <MarkerF
                onLoad={onLoad}
                key={id}
                position={{ lat: Lat, lng: Lng }}
                onClick={() => handleActiveMarker(id, restaurantBranch)}
              >
                {activeMarker === id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <h4>{restaurantBranch}</h4>
                      {Location}<br></br>
                      {Hours}<br></br>
                      Pickup: {pickUp}<br></br>
                      <button onClick={() => navigation(`/restaurantMenu/${restaurantBranch}`)}>Select</button>
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
          <div key={location.restaurantBranch}>
            <button onClick={() => handleActiveMarker(location.id, location.restaurantBranch)} style={{ margin: '10px', padding: '20px' }}>
              <h2>
                {index + 1}
                {' '}
                {location.restaurantBranch}
              </h2>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationView;

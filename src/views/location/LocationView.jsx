/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  GoogleMap, LoadScript, MarkerF, InfoWindowF,
} from '@react-google-maps/api';

function LocationView({
  locations, containerStyle, activeMarker, setActiveMarker, handleActiveMarker, center, onLoad,
}) {
  return (
    <div>
      <div>
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
                      {Name}
                      {Address}
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div>
        <h1>Locations</h1>
        {locations.map((location, index) => (
          <div key={location.Name}>
            <h2>
              Location #
              {index + 1}
            </h2>
            <h4>
              Name:
              {' '}
              {location.Name}
            </h4>
            <h4>
              Address:
              {' '}
              {location.Address}
            </h4>
            <h4>
              City:
              {' '}
              {location.City}
            </h4>
            <button onClick={() => handleActiveMarker(location.id, location.Name)}>Show</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationView;

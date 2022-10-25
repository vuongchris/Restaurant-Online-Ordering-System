/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import LocationView from '../../views/location/LocationView';
import { getLocations } from '../../services/Location/LocationService';

function LocationController() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const setState = async () => setLocations(await getLocations());
    setState();
  }, []);

  const containerStyle = {
    width: '100%',
    height: '600px',
  };

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker, name) => {
    console.log('id ', marker, name);
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const center = {
    lat: -33.88370859500305,
    lng: 151.19956390923684,
  };

  const onLoad = (marker) => {
    console.log('marker: ', marker);
  };

  return LocationView({
    locations, containerStyle, activeMarker, setActiveMarker, handleActiveMarker, center, onLoad,
  });
}

export default LocationController;

import React, { useEffect, useState } from 'react';
import LocationView from '../../views/location/LocationView';
import { getLocations } from '../../services/Location/LocationService';

function LocationController() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const setState = async () => setLocations(await getLocations());
    setState();
  }, []);
  return <LocationView locations={locations} />;
}

export default LocationController;

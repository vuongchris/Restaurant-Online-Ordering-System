import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Retrieve a list of all available restaurant locations
 * @returns Array [] of restaurant locations
 */
export const getLocations = async () => {
  const locationsCollection = collection(db, 'Locations');
  const locationList = await getDocs(locationsCollection);
  return Promise.all(locationList.docs.map((_doc) => _doc.data()));
};

export const temp = () => null;

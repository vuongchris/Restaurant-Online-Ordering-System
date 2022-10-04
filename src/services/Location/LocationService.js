import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const getLocations = async () => {
  const locationsCollection = collection(db, 'Locations');
  const locationList = await getDocs(locationsCollection);
  return Promise.all(locationList.docs.map((_doc) => _doc.data()));
};

export const temp = () => null;

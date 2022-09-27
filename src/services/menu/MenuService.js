import {
  collection, getDocs, orderBy, query,
} from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Get the full restaurant menu ordered alphabetically by "category"
 * @returns Promise
 */
export const getMenuOrderByCategory = async () => {
  const menuCollection = collection(db, 'menu');
  const q = query(menuCollection, orderBy('category', 'asc'));
  const menuSnapshot = await getDocs(q);
  return Promise.all(menuSnapshot.docs.map((_doc) => ({
    id: _doc.id,
    ..._doc.data(),
  })));
};

export const temp = () => null;

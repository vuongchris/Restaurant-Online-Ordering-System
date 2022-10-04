import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const getSavedPaymentDetails = async (id) => {
  const paymentsRef = collection(db, 'payment');
  const q = query(paymentsRef, where('userid', '==', id));
  const querySnapshot = await getDocs(q);
  return Promise.all(querySnapshot.docs.map((_doc) => _doc.data()));
};

export const getOrderHistory = () => [];

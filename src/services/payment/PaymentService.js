import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Saves the given payment data passed in the function's parameters
 * @param {*} data The payment details to save
 * @returns Promise
 */
export const savePaymentDetails = (data) => {
  const paymentCollection = collection(db, 'payment');
  return addDoc(paymentCollection, data);
};

export const paymentService = () => null;

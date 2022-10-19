/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, collection, doc } from 'firebase/firestore';
import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { auth, db } from '../../firebase';

const AuthContext = createContext();

/**
 * Returns the current user and authentication methods as a javascript object
 * @returns currentUser
 * @returns function register(email, password)
 * @returns function login(email, password)
 * @returns function logout()
 */
export const useAuth = () => useContext(AuthContext);

/**
 * (Component)
 * A wrapper for the app's Router,
 * which allows all child routes to access the current user & authentication methods
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const userCollectionRef = collection(db, 'user');

  /**
   * Register a user with their email and password
   * @param {String} email
   * @param {String} password
   * @returns Promise
   */
  const register = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(userCollectionRef, userCredentials.user.uid), {
      email,
      activeOrder: 'N/A',
    });
  };

  /**
   * Log in a user via their email and password
   * @param {String} email
   * @param {String} password
   * @returns Promise
   */
  const login = async (email, password) => signInWithEmailAndPassword(auth, email, password);

  /**
   * Signs out the current user
   * @returns Promise
   */
  const logout = async () => signOut(auth);

  // Listen for login/logout events and set the appropriate user for the session
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({
    currentUser,
    register,
    login,
    logout,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

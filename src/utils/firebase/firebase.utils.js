import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCuvPDRTwHzfOLFLHLpTREeK5eE15pvAZE',
  authDomain: 'crwn-clothing-db-13b76.firebaseapp.com',
  projectId: 'crwn-clothing-db-13b76',
  storageBucket: 'crwn-clothing-db-13b76.appspot.com',
  messagingSenderId: '116575582847',
  appId: '1:116575582847:web:5c8950731af977d37c5d4a',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export default firebaseApp;

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

  //if user data exists
  //return userDocRef

  //if user data does not exists
  //create / set the document with the data from userAuth in my collection
};

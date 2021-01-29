import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBPWhHAn3zzmkYYd6_P-T-bhIW4PIxQomI",
  authDomain: "clothingshopp-db.firebaseapp.com",
  databaseURL: "https://clothingshopp-db-default-rtdb.firebaseio.com",
  projectId: "clothingshopp-db",
  storageBucket: "clothingshopp-db.appspot.com",
  messagingSenderId: "853314381259",
  appId: "1:853314381259:web:75c040758bf7956042c24e",
  measurementId: "G-D46F75TMPY"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
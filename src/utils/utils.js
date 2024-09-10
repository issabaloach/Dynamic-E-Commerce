import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMEatCwAqLx7fNfjlIYzlGyrdlDd9B-dI",
  authDomain: "shop-app-using-react.firebaseapp.com",
  projectId: "shop-app-using-react",
  storageBucket: "shop-app-using-react.appspot.com",
  messagingSenderId: "1464475176",
  appId: "1:1464475176:web:ed905cce0df827ab809f1d",
  measurementId: "G-19772TTYQS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  app,
  auth
};

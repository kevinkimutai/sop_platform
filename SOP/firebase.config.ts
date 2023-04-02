// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZkhAk35_5hx1ypCQHccaflSs4-aLXO5A",
  authDomain: "sop-platform.firebaseapp.com",
  projectId: "sop-platform",
  storageBucket: "sop-platform.appspot.com",
  messagingSenderId: "1028549398330",
  appId: "1:1028549398330:web:b9654b010ae3c002d88a03",
  measurementId: "G-6G0BVDVXEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };

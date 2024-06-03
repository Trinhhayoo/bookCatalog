// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFBsc2oECU1K_oXYCBJOkQUVPMJSUiHI8",
  authDomain: "bookcatalog-39604.firebaseapp.com",
  projectId: "bookcatalog-39604",
  storageBucket: "bookcatalog-39604.appspot.com",
  messagingSenderId: "419005757124",
  appId: "1:419005757124:web:53e1e8e055bbe2a8a9bb91",
  measurementId: "G-6Q6LT8JNLQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services

const database = getDatabase(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

// Uncomment the following line if you need to initialize analytics
// const analytics = getAnalytics(app);

export {
  app,
  database,
  fireStore,
  storage
};

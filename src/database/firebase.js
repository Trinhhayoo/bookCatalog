// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfOG3mv4wEGIJCD3l63bs7n_RltO3uwIo",
  authDomain: "bookcatalog-40a90.firebaseapp.com",
  projectId: "bookcatalog-40a90",
  storageBucket: "bookcatalog-40a90.appspot.com",
  messagingSenderId: "833677726029",
  appId: "1:833677726029:web:e40964d56e747904d7e704",
  measurementId: "G-56FR7R8LQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

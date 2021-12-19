// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY_I2YSG-KSs3rLw2xgDPz2NE2xHkCnKw",
  authDomain: "winter-hackathon.firebaseapp.com",
  projectId: "winter-hackathon",
  storageBucket: "winter-hackathon.appspot.com",
  messagingSenderId: "400370685609",
  appId: "1:400370685609:web:f8f904ca678346889f3bb8"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

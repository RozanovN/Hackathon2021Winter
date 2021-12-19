// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMCH94jj2lTStKkYEz4ruGdabOubKYZpc", //current
  authDomain: "wt2021-6eddd.firebaseapp.com",
  projectId: "wt2021-6eddd",
  storageBucket: "wt2021-6eddd.appspot.com",
  messagingSenderId: "1020688770973",
  appId: "1:1020688770973:web:2a37b2361c91524e467174"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

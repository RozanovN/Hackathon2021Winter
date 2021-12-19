const firebaseConfig = {
  apiKey: "AIzaSyACt8rkK19iFkJLs3AJOxNVrQQ52JIhG98",
  authDomain: "winter2021hacks.firebaseapp.com",
  projectId: "winter2021hacks",
  storageBucket: "winter2021hacks.appspot.com",
  messagingSenderId: "443803406838",
  appId: "1:443803406838:web:1d35e3c8ad4d43ebdc37d7"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
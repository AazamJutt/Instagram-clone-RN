// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBrBmqQec5oqbC7tgK3JDYk7Gcl9mUCe4",
  authDomain: "rn-instagram-clone-d9771.firebaseapp.com",
  projectId: "rn-instagram-clone-d9771",
  storageBucket: "rn-instagram-clone-d9771.appspot.com",
  messagingSenderId: "917532412277",
  appId: "1:917532412277:web:c7cfe8339471f561942b3c",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;

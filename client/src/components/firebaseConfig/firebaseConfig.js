// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "chatapp-d252b.firebaseapp.com",
  projectId: "chatapp-d252b",
  storageBucket: "chatapp-d252b.appspot.com",
  messagingSenderId: "587988221454",
  appId: "1:587988221454:web:fdb9fd816c27ce0709065f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized")
export default getFirestore(app);
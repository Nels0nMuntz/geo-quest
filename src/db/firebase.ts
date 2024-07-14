// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOjbIxeAwF_vYl_yhaG7rufuT6FI6HjJk",
  authDomain: "geo-quest-cf1b0.firebaseapp.com",
  projectId: "geo-quest-cf1b0",
  storageBucket: "geo-quest-cf1b0.appspot.com",
  messagingSenderId: "356029279322",
  appId: "1:356029279322:web:41c31502e67000ebe13c63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

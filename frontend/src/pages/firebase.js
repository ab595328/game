// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK-mvVJQj0LolFZFQSI0t2r0rfl7RiEWk",
  authDomain: "fir-management-8b8aa.firebaseapp.com",
  databaseURL: "https://fir-management-8b8aa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-management-8b8aa",
  storageBucket: "fir-management-8b8aa.firebasestorage.app",
  messagingSenderId: "481011936036",
  appId: "1:481011936036:web:f6090791da730a6672e1b1",
  measurementId: "G-F2MJH54VX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
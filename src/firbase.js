
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Du7ukpoTMUmAdTXGDrlIqfw4pvapCGA",
  authDomain: "chat1-f33b9.firebaseapp.com",
  projectId: "chat1-f33b9",
  storageBucket: "chat1-f33b9.appspot.com",
  messagingSenderId: "878203238862",
  appId: "1:878203238862:web:e6eeb1e246d5f645ea139f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

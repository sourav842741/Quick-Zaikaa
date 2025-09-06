// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
authDomain: "quickzaika-ab365.firebaseapp.com",
  projectId: "quickzaika-ab365",
  storageBucket: "quickzaika-ab365.firebasestorage.app",
  messagingSenderId: "265589807208",
  appId: "1:265589807208:web:ce5877637c38a5fb9c03dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {provider,auth}

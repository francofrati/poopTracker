// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSZGTRbA3wzRdPXNemnGlaDYt3VxdxF80",
  authDomain: "poop-tracker-981a8.firebaseapp.com",
  projectId: "poop-tracker-981a8",
  storageBucket: "poop-tracker-981a8.appspot.com",
  messagingSenderId: "330858384306",
  appId: "1:330858384306:web:0af92256e3bafbe94a72ab",
  measurementId: "G-C46CMSG918"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getDatabase(app)

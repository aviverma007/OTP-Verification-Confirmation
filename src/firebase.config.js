// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk7g3kgNKK2WT9dOFmhXboJkhbi5JZv8w",
  authDomain: "otp-conirm.firebaseapp.com",
  projectId: "otp-conirm",
  storageBucket: "otp-conirm.appspot.com",
  messagingSenderId: "193095019603",
  appId: "1:193095019603:web:75bf8c3f6a80fe611a2aa6",
  measurementId: "G-CBKTMGK9GJ",
  recaptchaSiteKey: "your-recaptcha-site-key",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

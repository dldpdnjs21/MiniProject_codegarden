// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGfYAjfpV46UBDCs2seCzpikpoCXxaWpg",
  authDomain: "codegarden-6f4ba.firebaseapp.com",
  projectId: "codegarden-6f4ba",
  storageBucket: "codegarden-6f4ba.appspot.com",
  messagingSenderId: "257353950834",
  appId: "1:257353950834:web:942319d5de9d4d197044eb",
  measurementId: "G-T74Z0Q0QQP",
  databaseURL:
  "https://codegarden-6f4ba-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app;
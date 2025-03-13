// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdlqOuM0L9Li8xxuw8RawR7MHeIYisiUg",
  authDomain: "todo-33cc5.firebaseapp.com",
  projectId: "todo-33cc5",
  storageBucket: "todo-33cc5.firebasestorage.app",
  messagingSenderId: "697455274556",
  appId: "1:697455274556:web:94489e693f24ac6eff3139",
  measurementId: "G-HQ5FQ5M2CS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALpiUKLvvdtdzLc4ZgHe1sbySiFURIZc0",
  authDomain: "bible-app-cd9c4.firebaseapp.com",
  projectId: "bible-app-cd9c4",
  storageBucket: "bible-app-cd9c4.appspot.com",
  messagingSenderId: "455507275295",
  appId: "1:455507275295:web:93c46acb8bf50a4a0c2f2a",
  measurementId: "G-V19XDY7VHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
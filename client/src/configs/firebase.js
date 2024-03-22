import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALpiUKLvvdtdzLc4ZgHe1sbySiFURIZc0",
  authDomain: "bible-app-cd9c4.firebaseapp.com",
  projectId: "bible-app-cd9c4",
  storageBucket: "bible-app-cd9c4.appspot.com",
  messagingSenderId: "455507275295",
  appId: "1:455507275295:web:93c46acb8bf50a4a0c2f2a",
  measurementId: "G-V19XDY7VHD",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuF-52AUDAuhawHRKpO4lehTQcSEHEUcI",
  authDomain: "veehac-usm.firebaseapp.com",
  projectId: "veehac-usm",
  storageBucket: "veehac-usm.firebasestorage.app",
  messagingSenderId: "966390680418",
  appId: "1:966390680418:web:6d971dd18ef658bfdbfa3b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const userId = "BLGzajl4dJcNDSxYpJee"

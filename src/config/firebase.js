import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAEz9amuwaVu-n4Xmhjck6IdMS6MCJEgUs",
  authDomain: "vite-contact-7e98c.firebaseapp.com",
  projectId: "vite-contact-7e98c",
  storageBucket: "vite-contact-7e98c.appspot.com",
  messagingSenderId: "886322429890",
  appId: "1:886322429890:web:1c7d6ade0c86d03ee7e05b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4aLp0yM2yk1aTN2u0Nfgq0sX55_74p4",
  authDomain: "game-edukasi-kesehatan-gigi.firebaseapp.com",
  projectId: "game-edukasi-kesehatan-gigi",
  storageBucket: "game-edukasi-kesehatan-gigi.firebasestorage.app",
  messagingSenderId: "137225446088",
  appId: "1:137225446088:web:0ff8e7c08b2c849e997bfd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

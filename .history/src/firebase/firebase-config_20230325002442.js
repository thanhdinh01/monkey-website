import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB2QxGuflp6NCrwJTAiPLWVlIdHVZji4HU",
  authDomain: "monkey-website-86626.firebaseapp.com",
  projectId: "monkey-website-86626",
  storageBucket: "monkey-website-86626.appspot.com",
  messagingSenderId: "478713936881",
  appId: "1:478713936881:web:4e3cb7f9f1981d9c9a2250",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyB0PL7rK9uHOqGkmYzKdZQ7Nwl5EH9islQ",
  authDomain: "jnanagni-react-ee7df.firebaseapp.com",
  projectId: "jnanagni-react-ee7df",
  storageBucket: "jnanagni-react-ee7df.appspot.com",
  messagingSenderId: "726842727164",
  appId: "1:726842727164:web:e982a89c5e3fd86785d579",
  measurementId: "G-XGKC3ZYGCF",
  databaseURL: "https://jnanagni-react-ee7df-default-rtdb.europe-west1.firebasedatabase.app"
};

// Singleton pattern
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
export { db, realtimeDb };
export const auth = getAuth(app);
export const database = getDatabase(app);

export {app};
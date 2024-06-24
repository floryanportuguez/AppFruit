import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCE-IeoUPocuyfTqyQYqq_ahKCFPwzFYIk",
  authDomain: "lab-appfruit.firebaseapp.com",
  projectId: "lab-appfruit",
  storageBucket: "lab-appfruit.appspot.com",
  messagingSenderId: "442606234593",
  appId: "1:442606234593:web:94f5b9fd2543f87094c0a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
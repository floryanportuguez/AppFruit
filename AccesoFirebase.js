// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE-IeoUPocuyfTqyQYqq_ahKCFPwzFYIk",
  authDomain: "lab-appfruit.firebaseapp.com",
  projectId: "lab-appfruit",
  storageBucket: "lab-appfruit.appspot.com",
  messagingSenderId: "442606234593",
  appId: "1:442606234593:web:94f5b9fd2543f87094c0a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
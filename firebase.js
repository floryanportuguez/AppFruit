import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCcEPY_93HOzo1WDtB-VrZcgGZZQzpgqN8",
  authDomain: "appfruit-c002d.firebaseapp.com",
  projectId: "appfruit-c002d",
  storageBucket: "appfruit-c002d.appspot.com",
  messagingSenderId: "97759986191",
  appId: "1:97759986191:web:06b7d8e73b7503c680597a",
  measurementId: "G-87RBLSSX5B"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Función para crear las colecciones "User" y "Product"
const createCollections = async () => {
  try {
    
    await addDoc(collection(db, 'User'), {
      sampleField: 'sampleValue'
    });

    
    await addDoc(collection(db, 'Product'), {
      sampleField: 'sampleValue'
    });

    console.log('Colecciones creadas exitosamente');
  } catch (e) {
    console.error('Error al crear las colecciones: ', e);
  }
};


export { db, createCollections };

// // firebase/firebaseConfig.js
// import { initializeApp, getApps, getApp } from '@firebase/app';
// import { getAuth } from '@firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCPuwBjKdhYPLA8GDaCQz9b9zfrpY-TETE",
//   authDomain: "react-native-shop-b6121.firebaseapp.com",
//   projectId: "react-native-shop-b6121",
//   storageBucket: "react-native-shop-b6121.appspot.com",
//   messagingSenderId: "304052249882",
//   appId: "1:304052249882:web:432a4a5e86514ee6b238a3"
// };

// // Ensure only one Firebase app instance
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);
// const auth = getAuth(app);

// export { auth };
// // firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app'; // ✅ use 'firebase/app'
import { getAuth } from 'firebase/auth'; // ✅ same here
import { getFirestore } from 'firebase/firestore'; // ✅ correct

const firebaseConfig = {
  apiKey: "AIzaSyCPuwBjKdhYPLA8GDaCQz9b9zfrpY-TETE",
  authDomain: "react-native-shop-b6121.firebaseapp.com",
  projectId: "react-native-shop-b6121",
  storageBucket: "react-native-shop-b6121.appspot.com",
  messagingSenderId: "304052249882",
  appId: "1:304052249882:web:432a4a5e86514ee6b238a3"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db }; // ✅ make sure to export db

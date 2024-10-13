import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Add GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyCJuvHW78MitYzzDli4l25_7RY_DlgXJYc",
  authDomain: "jocomo-74850.firebaseapp.com",
  projectId: "jocomo-74850",
  storageBucket: "jocomo-74850.appspot.com",
  messagingSenderId: "538988118074",
  appId: "1:538988118074:web:bb941538bbed50a7e73503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

// Initialize GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

export { fireDB, auth, googleProvider };

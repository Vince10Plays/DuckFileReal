
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDf1eo_D7xs_UQE_dpa9u3EaZ7I-_O0Vgo",
  authDomain: "duckfile-8f851.firebaseapp.com",
  projectId: "duckfile-8f851",
  storageBucket: "duckfile-8f851.firebasestorage.app",
  messagingSenderId: "772716792231",
  appId: "1:772716792231:web:4e4619524c906162b7ce82"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMShGRQxhrqfvmZ3zhTNXeJQ7qHozOuns",
  authDomain: "chatapp-91647.firebaseapp.com",
  projectId: "chatapp-91647",
  storageBucket: "chatapp-91647.appspot.com",
  messagingSenderId: "782662658929",
  appId: "1:782662658929:web:c8f59a3fd9be0ef13d64d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase deki auth yapısının referansını react uygulamasuna alma
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();
// başka bir provider seçseydik mesela github GithubAuthProvider() olarak tanımlardık

// firebase deki firestore veri tabanının referansını al
export const db = getFirestore(app);

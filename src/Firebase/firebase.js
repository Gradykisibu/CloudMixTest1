import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAnIgRdPPlGkErDJcrJZLPpPY7i-uforwg",
    authDomain: "cloudmix-b91a1.firebaseapp.com",
    projectId: "cloudmix-b91a1",
    storageBucket: "cloudmix-b91a1.appspot.com",
    messagingSenderId: "224019199733",
    appId: "1:224019199733:web:c0cecd713b4f0b785377bc"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, auth,storage };
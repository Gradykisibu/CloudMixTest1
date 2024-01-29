import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import "firebase/compat/storage"

// const firebaseConfig = {
//     apiKey: "AIzaSyAnIgRdPPlGkErDJcrJZLPpPY7i-uforwg",
//     authDomain: "cloudmix-b91a1.firebaseapp.com",
//     projectId: "cloudmix-b91a1",
//     storageBucket: "cloudmix-b91a1.appspot.com",
//     messagingSenderId: "224019199733",
//     appId: "1:224019199733:web:c0cecd713b4f0b785377bc"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyCQCmwBV0AJPHT-hNo4NmHX1d1fPwe4D9Y",
  authDomain: "cloudmixtesting.firebaseapp.com",
  databaseURL: "https://cloudmixtesting-default-rtdb.firebaseio.com",
  projectId: "cloudmixtesting",
  storageBucket: "cloudmixtesting.appspot.com",
  messagingSenderId: "950380804900",
  appId: "1:950380804900:web:2f83bed49393f8b82211b1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, auth,storage };
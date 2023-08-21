import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc,updateDoc, deleteDoc    , serverTimestamp, addDoc, collection, getDocs,query,orderBy } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage ,ref, uploadBytesResumable, getDownloadURL   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkVLH1mh4603zMAKBQgjFeY-3s8GkXRsk",
  authDomain: "hackathone-c9307.firebaseapp.com",
  projectId: "hackathone-c9307",
  storageBucket: "hackathone-c9307.appspot.com",
  messagingSenderId: "864129099639",
  appId: "1:864129099639:web:f40f9f2c40ae5d6090a372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);



export{
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc,
    signInWithEmailAndPassword,
    getDoc,
    signOut,
    getStorage ,ref, uploadBytesResumable, getDownloadURL,
    storage,
    serverTimestamp,
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc ,
    deleteDoc 

}
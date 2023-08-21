import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc,updateDoc, deleteDoc    , serverTimestamp, addDoc, collection, getDocs,query,orderBy } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage ,ref, uploadBytesResumable, getDownloadURL, deleteObject   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYSZhPr3omMoy2t2SwcpQrfZDquSz4Uj4",
  authDomain: "hackthone-5d30f.firebaseapp.com",
  projectId: "hackthone-5d30f",
  storageBucket: "hackthone-5d30f.appspot.com",
  messagingSenderId: "738028625499",
  appId: "1:738028625499:web:7922ae46ef11a050dce97e"
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
    deleteDoc ,
    deleteObject

}
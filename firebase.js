// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, getDoc,setDoc  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage,ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP_vQFn-GDOoLadmJUgTOBgmB0nEHKaKU",
    authDomain: "test-9a84e.firebaseapp.com",
    projectId: "test-9a84e",
    storageBucket: "test-9a84e.appspot.com",
    messagingSenderId: "681262139120",
    appId: "1:681262139120:web:dc16cbb0240f6cf5a26435"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);


export {
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    collection,
    addDoc,
    getStorage,
    storage,
    ref, 
    uploadBytesResumable, 
    getDownloadURL,
    signInWithEmailAndPassword,
    doc, 
    getDoc,
    setDoc 
}
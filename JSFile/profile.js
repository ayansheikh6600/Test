import {
    auth, app, createUserWithEmailAndPassword, db, collection, addDoc, getStorage,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    signInWithEmailAndPassword,
    doc,
    getDoc,
    setDoc
} from "../firebase.js";


const UserData = JSON.parse(localStorage.getItem("user"))

console.log(UserData.UID)

window.addEventListener("load", user)
function user() {
    const UserData = JSON.parse(localStorage.getItem("user"))
    const ProfileImage = document.getElementById("ProfileImage")
    const Name = document.getElementById("Name")
    const UserEmail = document.getElementById("UserEmail")

Name.value = UserData.Name
    UserEmail.value = UserData.Email
    ProfileImage.src = UserData.ProfileImageURL

}
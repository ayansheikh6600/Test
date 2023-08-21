import{
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc,
    signInWithEmailAndPassword,
    getDoc,
    signOut
} from "../firebase.js"


window.addEventListener("load", function(){
    const userData= JSON.parse(localStorage.getItem("user"))
    console.log(userData)
    if(userData == null){
        window.history.back()
    }

    let FName = document.getElementById("FName")
    let LName = document.getElementById("LName")
    let UserEmail = document.getElementById("UserEmail")
    let ProfileImage = document.getElementById("ProfileImage")
    FName.value = userData.FirstName
    LName.value = userData.LastName
    UserEmail.value = userData.email
    ProfileImage.src = userData.ProfileImageURL

})

function logout(){
    // console.log(e.innerHTML)
    const userData= JSON.parse(localStorage.getItem("user"))
    if(userData != null){
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.clear()
            window.location.replace("../index.html")
          }).catch((error) => {
            // An error happened.
          });
    }
}


window.logout = logout

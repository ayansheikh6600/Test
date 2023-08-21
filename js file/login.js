import {
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc,
    signInWithEmailAndPassword,
    getDoc
} from "../firebase.js"


window.addEventListener("load" , function(){
   const userData =  JSON.parse(localStorage.getItem("user"))
    console.log(userData)
    if(userData != null){
        window.history.back()
    }
})

function login() {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const loginBtn = document.getElementById("loginBtn")
    loginBtn.innerHTML = `<div class="ayan">
    <div class="spinner-border text-light ayan" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
</div>`
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                localStorage.setItem("user", JSON.stringify(docSnap.data()))
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            window.location.replace("../index.html")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

}







window.login = login
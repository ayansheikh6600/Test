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

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});

async function Signup(e) {
  console.log(
    e
  )
  e.innerHTML = `<div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`

  var Email = document.getElementById("SEmail").value
  var Password = document.getElementById("SPassword").value
  var FullName = document.getElementById("FullName").value
  var ProfileImage = document.getElementById("ProfileImage").files[0]


  // console.log(ProfileImage)
  if (!Email || !Password || !FullName) {
    alert("Enter Email & Password")
    e.innerHTML = "Signup"
    return
  }
  if (ProfileImage == undefined) {
    alert("Please Choose Profile Image")
    e.innerHTML = "Signup"
    return
  }
  console.log("hii")


  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + ProfileImage.name);
  const uploadTask = uploadBytesResumable(storageRef, ProfileImage, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        createUserWithEmailAndPassword(auth, Email, Password)
          .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)

            const userOBJ = {
              Name: FullName,
              Email: Email,
              UID: user.uid,
              ProfileImageURL: downloadURL
            }


            try {
              await setDoc(doc(db, "users", user.uid), userOBJ);
              // console.log("Document written with ID: ", docRef.id);
              window.location.replace("./profile.html")

              e.innerHTML = "Signup"
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Creditional Error")
            e.innerHTML = "Signup"
            // ..
          });
      });
    }
  );


}







function login(e) {
  const Email = document.getElementById("Email").value
  const Password = document.getElementById("Password").value
  e.innerHTML = `<div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
  if (!Email || !Password) {
    alert("Enter Email & Password")
    e.innerHTML = "Login"
    return
  }

  signInWithEmailAndPassword(auth, Email, Password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        localStorage.setItem("user", JSON.stringify(docSnap.data()))
        e.innerHTML = "Login"


      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        e.innerHTML = "Login"
      }
      window.location.replace("./profile.html")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      e.innerHTML = "Login"
    });


  // console.log("hii")




}



window.Signup = Signup
window.login = login
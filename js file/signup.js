import {
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc,
    getStorage, ref, uploadBytesResumable, getDownloadURL,
    storage
} from "../firebase.js"





function Signup() {

    //     e.innerHTML = `<div class="spinner-border text-light" role="status">
    //     <span class="visually-hidden">Loading...</span>
    //   </div>`
    console.log(app)

    const FirstName = document.getElementById("FirstName").value
    const LastName = document.getElementById("LastName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const Cpassword = document.getElementById("Cpassword").value
    const ProfileImage = document.getElementById("ProfileImage").files[0]
    const signupBtn = document.getElementById("signupBtn")

   

    console.log(ProfileImage)


    if (ProfileImage == undefined) {
        alert("Please Choose Profile Image")
        return
    }
    if (!FirstName || !LastName || !email || !password) {
        alert("Please enter required feilds")
        return
    }

    signupBtn.innerHTML = `<div class="ayan">
    <div class="spinner-border text-light ayan" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
</div>`

    if (FirstName.length >= 3) {

        if (LastName.length > 0) {

            if (FirstName.length + LastName.length <= 20) {

                if (password.length >= 8) {
                    if (password == Cpassword) {


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
                                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                    console.log('File available at', downloadURL);

                                    await createUserWithEmailAndPassword(auth, email, password)
                                        .then(async (userCredential) => {
                                            // Signed in 
                                            const user = userCredential.user;

                                            const userObj = {
                                                FirstName,
                                                LastName,
                                                email,
                                                UID: user.uid,
                                                ProfileImageURL : downloadURL
                                            }
                                            await setDoc(doc(db, "users", user.uid), userObj);
                                            localStorage.setItem("user", JSON.stringify(userObj))

                                            window.location.replace("../index.html")

                                        })
                                        .catch((error) => {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            // ..
                                        });

                                });
                            }
                        );






                    } else {
                        alert("Password Does not Match")
                        signupBtn.innerHTML = "SIGNUP"
                    }
                } else {
                    alert("Password must be 8 & more character")
                    signupBtn.innerHTML = "SIGNUP"
                }

            } else {
                alert("First And Last don't Upto 20 character")
                signupBtn.innerHTML = "SIGNUP"
            }

        } else {
            alert("FirstName Atleast upto 1 character")
            signupBtn.innerHTML = "SIGNUP"
        }

    } else {
        alert("FirstName Atleast upto 3 character")
        signupBtn.innerHTML = "SIGNUP"
    }





}


window.Signup = Signup



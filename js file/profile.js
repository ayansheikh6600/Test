import {
    app,
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc,
    signInWithEmailAndPassword,
    getDoc,
    signOut,
    deleteObject,
    ref,
    uploadBytesResumable, getDownloadURL,
    getStorage,
    storage,
    updateDoc,
    getDocs,
    collection
} from "../firebase.js"


window.addEventListener("load", async function () {
    const LuserData = JSON.parse(localStorage.getItem("user"))
    console.log(LuserData)
    if (LuserData == null) {
        window.history.back()
    }

    const docRef = doc(db, "users", LuserData.UID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        var datta = docSnap.data()

    } else {
        console.log("No such document!");
    }

    let FName = document.getElementById("FName")
    let LName = document.getElementById("LName")
    let UserEmail = document.getElementById("UserEmail")
    let ProfileImage = document.getElementById("ProfileImage")
    FName.value = datta.FirstName
    LName.value = datta.LastName
    UserEmail.value = datta.email
    ProfileImage.src = datta.ProfileImageURL

})

function logout() {
    // console.log(e.innerHTML)
    const userData = JSON.parse(localStorage.getItem("user"))
    if (userData != null) {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.clear()
            window.location.replace("../index.html")
        }).catch((error) => {
            // An error happened.
        });
    }
}


async function SelectImage(e) {
    // console.log(e.children[0])
    const imageTag = e.children[0].src
    console.log(e)
    const UpdateImage = document.createElement("input")
    UpdateImage.setAttribute("type", "file")
    UpdateImage.setAttribute("id", "Foo")
    UpdateImage.setAttribute("onchange", "updatage(this)")
    console.log(UpdateImage)
    await UpdateImage.click()
    e.appendChild(UpdateImage)
    console.log(e)
}


// if(UpdateImage.files[0] == undefined){
//     return
// }
// console.log(UpdateImage.files[0])
// }

async function Test(e, postsData) {
    console.log(e, "===", postsData)
    const cityRef = doc(db, 'Posts', e);
    await setDoc(cityRef, postsData);
}

async function updatage(e) {
    console.log(e.parentNode.children[0])
    const image = e.parentNode.children[0]
    const Updateimg = e.files[0]
    console.log(Updateimg)
    const UserData = JSON.parse(localStorage.getItem("user"))
    console.log(UserData)


    // return console.log("AYan")
    const LoadingDiv = document.querySelector(".LoadingDiv")
    const lowOpacity = document.querySelector("#lowOpacity")

    lowOpacity.style.opacity = "30%"


    LoadingDiv.style.display = "block"


    const desertRef = ref(storage, 'images/' + UserData.imageRef);

    // Delete the file
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        const storageRef = ref(storage, 'images/' + Updateimg.name);

        const uploadTask = uploadBytesResumable(storageRef, Updateimg);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
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
                // Handle unsuccessful uploads
                LoadingDiv.style.display = "none"
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);

                    const docRef = doc(db, "users", UserData.UID);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // console.log("Document data:", docSnap.data());

                        const FirbaseUserDate = docSnap.data()

                        FirbaseUserDate.ProfileImageURL = downloadURL
                        FirbaseUserDate.imageRef = Updateimg.name

                        const washingtonRef = doc(db, "users", UserData.UID);

                        // Set the "capital" field of the city 'DC'
                        await updateDoc(washingtonRef, FirbaseUserDate);

                        UserData.ProfileImageURL = downloadURL
                        UserData.imageRef = Updateimg.name

                        const querySnapshot = await getDocs(collection(db, "Posts"));
                        querySnapshot.forEach(async (doc) => {
                            const postsData = doc.data()
                            if (UserData.UID === postsData.UID) {
                                // console.log(doc.id, " => ", postsData.Image = "ayan");
                                const postId = doc.id
                                postsData.Image = downloadURL
                                // console.log(postsData)
                                // console.log(postId)

                               await Test(postId, postsData)
                                // console.log("Ayan")

                                // const cityRef = doc(db, 'Posts', postId);
                                // await setDoc(cityRef, postsData);



                            }

                            // doc.data() is never undefined for query doc snapshots

                        });

                        localStorage.setItem("user", JSON.stringify(UserData))
                        
                        function myFunction() {
                          let  timeout = setTimeout(alertFunc, 3000);
                          }

                          myFunction()
                          
                          function alertFunc() {
                            LoadingDiv.style.display = "none"
                            window.location.reload()
                          }
                        await console.log("Ayan")



                         



                    } else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                    }

                //    
                });
            }
        );
    }).catch((error) => {
        // Uh-oh, an error occurred!
        LoadingDiv.style.display = "none"
    });

}



window.logout = logout
window.SelectImage = SelectImage
window.updatage = updatage

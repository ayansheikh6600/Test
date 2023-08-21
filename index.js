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
    serverTimestamp,
    addDoc,
    collection,
    getDocs,
    query,
    updateDoc,
    deleteDoc
} from "./firebase.js"

window.addEventListener("load", async function () {
    const UserName = document.getElementById("UserName")
    const userData = JSON.parse(localStorage.getItem("user"))
    console.log(userData)

    if (userData != null) {
        const FulName = userData.FirstName + " " + userData.LastName
        console.log(FulName)


        UserName.innerHTML = FulName

        const MyBlogs = document.querySelector("#MyBlogs")
        const q = query(collection(db, "Posts"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            const BlogData = doc.data()
            if (BlogData.UID == userData.UID) {
                const card = `<div id="" class="BlogDivInput p-3 mt-2">
            <div class="d-flex check">
            <div class="me-3">
                <img id="ProfilImage" src="${BlogData.Image}" width="100px" height="100px" alt="">
            </div>
            <div class="">
                <div><h3 id="BlogTitle">${BlogData.Title}</h3></div>
                <div>
                    <span id="UserName">${BlogData.FullName}</span> - <span id="BlogDate">${BlogData.timestamp.toDate()}</span>
                </div>
            </div>
          </div>
          <div>
            <p>${BlogData.Desc}</p>
          </div>
          <div>
            <button class="btn btn-dark" onclick="edit('${doc.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">EDIT</button>
            <button class="btn btn-dark" onclick="deleteDee(this,'${doc.id}')">DELETE</button>
          </div>
          </div>`

                MyBlogs.innerHTML += card
            }
        });
    } else {
        const login = this.document.getElementById("logoutBTN")
        login.innerHTML = "LOGIN"
    }


    if (userData == null) {

        const MyBlogDiv = document.querySelector(".MyBlogDiv")
        MyBlogDiv.style.display = "none"

        const AllBlogs = document.getElementById("AllBlogs")
        const q = query(collection(db, "Posts"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            const BlogData = doc.data()
            // if (BlogData.UID == userData.UID) {
                    const card = `<div id="" class="BlogDivInput p-3 mt-2"><span id="" ></span>
                <div class="d-flex check">
                <div class="me-3">
                    <img id="ProfilImage" src="${BlogData.Image}" onclick="ProfileShow('${BlogData.UID}')" width="100px" height="100px" alt="">
                </div>
                <div class="">
                    <div><h3 id="BlogTitle">${BlogData.Title}</h3></div>
                    <div>
                        <span id="UserName">${BlogData.FullName}</span> - <span id="BlogDate">${BlogData.timestamp.toDate()}</span>
                    </div>
                </div>
            </div>
            <div>
                <p>${BlogData.Desc}</p>
            </div>
            <div>

            </div>
            </div>`

          AllBlogs.innerHTML += card
            // }
        });

    }




})






function logout(e) {



    console.log(e.innerHTML)
    const userData = JSON.parse(localStorage.getItem("user"))
    if (userData != null) {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.clear()
            window.location.reload()
        }).catch((error) => {
            // An error happened.
        });
    } else {
        window.location.href = "./screens/login.html"
    }

}

function ProfilPage() {
    window.location.href = "./screens/profile.html"
}

async function BlogPost() {
    var title = document.getElementById("title")
    var desc = document.getElementById("desc")
    const UserData = JSON.parse(localStorage.getItem("user"))
    console.log(UserData)

    const PostObj = {
        Title: title.value,
        Desc: desc.value,
        Image: UserData.ProfileImageURL,
        FullName: UserData.FirstName + " " + UserData.LastName,
        timestamp: serverTimestamp(),
        UID: UserData.UID


    }

    const docRef = await addDoc(collection(db, "Posts"), PostObj);
    console.log("Document written with ID: ", docRef.id);
    window.location.reload()

}


function edit(e) {
    console.log(e)
    localStorage.setItem("edit", JSON.stringify(e))
}

async function EditValue() {

    console.log("hhh")
    const edit = JSON.parse(localStorage.getItem("edit"))
    console.log(edit)
    const EditTitleInput = document.getElementById("EditTitleInput").value
    const EditDescInput = document.getElementById("EditDescInput").value

    if (!EditTitleInput || !EditDescInput) {
        alert("plaese input")
        return
    }

    const docRef = doc(db, "Posts", edit);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const PostData = docSnap.data()

        PostData.Desc = EditDescInput
        PostData.Title = EditTitleInput

        const washingtonRef = doc(db, "Posts", edit);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, PostData);
        console.log(PostData)
        const CloseModal = document.getElementById("CloseModal").click()
        window.location.reload()




        return


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}





async function deleteDee(e, id) {
    e.parentNode.parentNode.remove()
    console.log(id)

    await deleteDoc(doc(db, "Posts", id));





}


function ProfileShow(e){


console.log(e)
localStorage.setItem("ProfileShowId" ,JSON.stringify(e))
window.location.href = "./screens/userProfile.html"

}











window.logout = logout
window.ProfilPage = ProfilPage
window.BlogPost = BlogPost
window.edit = edit
window.EditValue = EditValue
window.deleteDee = deleteDee
window.ProfileShow = ProfileShow
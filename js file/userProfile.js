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
} from "../firebase.js"


window.addEventListener("load", async function () {

    const BlogDiv = document.getElementById("BlogDiv")

    const userData = JSON.parse(localStorage.getItem("ProfileShowId"))

    console.log(userData)


    const MyBlogs = document.querySelector("#MyBlogs")
    const q = query(collection(db, "Posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        const BlogData = doc.data()
        if (BlogData.UID == userData) {
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
          </div>`

            BlogDiv.innerHTML += card
        }
    });


    const docRef = doc(db, "users", userData);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const dtata = docSnap.data()
        const ProfileImage = document.getElementById("ProfileImage")
    const FName = document.getElementById("FName")
    const LName = document.getElementById("LName")
    const UserEmail = document.getElementById("UserEmail")
    const userName = document.getElementById("userName")


    FName.value = dtata.FirstName
    LName.value = dtata.LastName
    UserEmail.value = dtata.email
    ProfileImage.src = dtata.ProfileImageURL
    userName.innerHTML = dtata.FirstName + " " + dtata.LastName

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }








})
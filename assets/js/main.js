var firebaseConfig = {
    apiKey: "AIzaSyA-6F0DjlfEcZ-PDM1Aa5d3yt8LvB5Zfh8",
    authDomain: "everythingcivil-c82db.firebaseapp.com",
    databaseURL: "https://everythingcivil-c82db-default-rtdb.firebaseio.com",
    projectId: "everythingcivil-c82db",
    storageBucket: "everythingcivil-c82db.appspot.com",
    messagingSenderId: "877076463719",
    appId: "1:877076463719:web:5f6195565bb3b90c1ad4c2",
    measurementId: "G-9GHM9320WY",
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

document.getElementById("pagetitle").innerHTML = "";
document.getElementById("navbardata").innerHTML = "";

firebase
.firestore()
.collection("navbar")
.get()
.then((docs) => {
docs.forEach((doc) => {
    document.getElementById("navbardata").innerHTML += `
            <a class="nav-link" aria-current="page" href="${doc.data().link}">${doc.data().name}</a>
        `;
    let i = doc.data().link;
    if(window.location.pathname.split("/").pop() == i){
        document.getElementById("pagetitle").innerHTML = doc.data().title;
    }

    });
});

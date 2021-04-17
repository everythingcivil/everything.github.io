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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //console.log(user);
  } else {
    window.location.href = "index.html";
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location = "index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showposts() {
  document.getElementById("postlist").innerHTML = "";
  let i = 1;

  firebase
    .firestore()
    .collection("posts")
    .where("status", "==", 2)
    .orderBy('timestamp', 'desc')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        document.getElementById("postlist").innerHTML += `
          <tr>
              <th scope="row">${i++}</th>
              <td class="w-50">${doc.data().title}</td>
              <td>${doc.data().date}</td>
              <td class="small"><a href="../article.html?${doc.data().slug}-${doc.id}" target="_blank">View Article</a></td>
              <td class="small"><a style="color:#17a2b8 !important" onClick="publishpost('${doc.id}')">Publish</a></td>
              <td class="small"><a style="color:red !important" onClick="sentToEdit('${doc.id}')">Sent to Edit</a></td>
          </tr>
        `;
      })
    });

}

function publishpost(id) {
  if (confirm("Are you Sure to Publish?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        status: 3
      })
      .then((doc) => {
        alert("Article Published");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function sentToEdit(id) {
  if (confirm("Are you Sure to send the article to Edit?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        status: 1
      })
      .then((doc) => {
        alert("Article Sent to Create Folder");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function archivedposts() {
  document.getElementById("postlist").innerHTML = "";
  let i = 1;

  firebase
    .firestore()
    .collection("posts")
    .where("status", "==", 4)
    .orderBy('timestamp', 'desc')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        document.getElementById("postlist").innerHTML += `
                    <tr>
                        <th scope="row">${i++}</th>
                        <td class="w-50">${doc.data().title}</td>
                        <td class="w-50">${doc.data().author}</td>
                    </tr>
                `;
      })
    });

}

showposts();
archivedposts()
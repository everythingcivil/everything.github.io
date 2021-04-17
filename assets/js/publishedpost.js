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
    .where("status", "==", 3)
    .orderBy('timestamp', 'desc')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        let popularCol, popularFn, popularText;
        if (doc.data().popularity == 1) {
          popularCol = "Yes"
          popularFn = "markPopular"
          popularText = "Mark Unpopular"
        } else {
          popularCol = "No"
          popularFn = "markUnpopular"
          popularText = "Mark Popular"
        }
        document.getElementById("postlist").innerHTML += `
          <tr>
              <th scope="row">${i++}</th>
              <td>${doc.data().title}</td>
              <td class="small">${popularCol}</td>
              <td class="small">
                  <a class="me-2" onClick="viewpost('${doc.id}')">View Blog</a>
              </td>
              <td class="small">
                  <a style="color:rgb(0 172 105) !important" onClick="${popularFn}('${doc.id}')">${popularText}</a>
              </td>
              <td class="small">
              <a class="me-2" onClick="unpublish('${doc.id}')">Unpublish</a>
              </td>
          </tr>
        `;
      })
    });

}

function viewpost(id, slug) {
  window.open("article.html?" + slug + id, '_blank');
}

function markPopular(id) {
  if (confirm("Are you Sure?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        popularity: 1
      })
      .then((doc) => {
        alert("Marked Popular!");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function markUnpopular(id) {
  if (confirm("Are you Sure?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        popularity: 0
      })
      .then((doc) => {
        alert("Marked Unpopular!");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function unpublish(id) {
  if (confirm("On Unpublished, Artcile will sent to Drafts. Are you Sure?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        status: 2
      })
      .then((doc) => {
        alert("Article Unpublished and sent to Drafts");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

showposts();
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
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  firebase
    .firestore()
    .collection("posts")
    .where("status", "==", 2)
    .orderBy('date', 'desc')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        document.getElementById("postlist").innerHTML += `
                    <tr>
                        <th scope="row">${i++}</th>
                        <td class="w-50">${doc.data().title}</td>
                        <td>${doc.data().date.toDate().toLocaleDateString('en-US', options).split(' ').slice(1).join(' ')}</td>
                        <td class="small">
                            <div><a onClick="viewpost('${doc.id}')">View Blog</a></div>
                            <div><a style="color:#17a2b8 !important" onClick="publishpost('${doc.id}')">Publish</a></div>
                        </div>
                        </td>
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

function viewpost(id, slug) {
  window.open("article.html?" + slug + id, '_blank');
}

function archivedposts() {
  document.getElementById("postlist").innerHTML = "";
  let i = 1;
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  firebase
    .firestore()
    .collection("posts")
    .where("status", "==", 4)
    .orderBy('date', 'desc')
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
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

function createpost() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let tag1 = document.getElementById("tag1").value;
  let tag2 = document.getElementById("tag2").value;
  let shortIntro = document.getElementById("shortIntro").value;
  let imglen = document.querySelector("#image").files.length
  let slug = slugify(title);

  if (imglen == 0 || title == "" || author == "" || tag1 == "" || tag2 == "") {
    alert("Enter Data and Upload Image First!");
  } else {
    var image = document.querySelector("#image").files[0];
    var imagename = +new Date() + "-" + image.name;
    var metadata = {
      contentType: image.type
    };

    var storageRef = firebase.storage().ref('images/' + imagename);
    var uploadTask = storageRef.put(image, metadata)
    uploadTask.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log("Upload is " + progress + "done");
    }, function (error) {
      console.log(error.message);
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
        firebase
          .firestore()
          .collection("posts")
          .add({
            status: 1,
            author: author,
            tag1: tag1,
            tag2: tag2,
            title: title,
            slug: slug,
            date: firebase.firestore.Timestamp.now(),
            content: "<b>Start Creating Masterpiece...</b>",
            image: downloadUrl,
            shortIntro: shortIntro
          }, function (error) {
            if (error) {
              alert('Error While Uploading');
            } else {
              alert('Data Updated successfully');
              location.reload();
            }
          })
          .then((doc) => {
            alert('Data Updated successfully');
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });
  }

}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
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
    .where("status", "==", 1)
    .orderBy('date', 'desc')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        document.getElementById("postlist").innerHTML += `
                <tr>
                    <th scope="row">${i++}</th>
                    <td>${doc.data().title}</td>
                    <td>${doc.data().date.toDate().toLocaleDateString('en-US', options).split(' ').slice(1).join(' ')}</td>
                    <td class="small">
                        <div><a onClick="addcontent('${doc.id}')">Add Content</a></div>
                        <div><a style="color:#17a2b8 !important" onClick="todrafts('${doc.id}')">Send to Draft</a></div>
                        <div><a style="color:red !important" onClick="deletepost('${doc.id}')">Delete</a></div>
                    </div>
                    </td>
                </tr>
            `;
      })
    });

}

function addcontent(id) {
  window.open("editor.html?" + id);
}

function todrafts(id) {
  if (confirm("Are you Sure?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        status: 2
      })
      .then((doc) => {
        alert("Sent to Drafts");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

function deletepost(id) {
  if (confirm("Are you Sure?")) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        status: 4
      })
      .then((doc) => {
        alert("Sent to archive section of Drafts");
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

showposts();
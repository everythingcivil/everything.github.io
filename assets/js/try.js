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
    let tags = document.getElementById("tags").value;
  
    if (!title && !author && !tags && !content) {
      alert("Kindly input valid Text");
    } else {
      console.log(title);
      firebase
        .firestore()
        .collection("posts")
        .add({
          title: title,
          content: content,
        })
        .then((doc) => {
          console.log("Doc id " + doc.id);
          alert("Data Added");
          document.getElementById("title").value = "";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }  
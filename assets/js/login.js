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
    window.location.href = "dashboard.html";
  } else {
    //Error
  }
});

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  document.getElementById("wrongalert").innerHTML = "";

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (result) {
      var user = result.user;
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("wrongalert").innerHTML = '<div class="alert alert-danger" role="alert"><strong>Oh Snap!</strong> Bad Credentials!</div>';
    });
}

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

function showArtile(id) {
  document.getElementById("showposts").innerHTML = "";
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  let origin = window.location.origin;
  let locUrl = origin + '/article.html';

  if (window.location.href == locUrl) {
    window.location = "index.html";
    return;
  }


  var docRef = firebase.firestore().collection('posts').doc(id)

  docRef.get()
    .then((doc) => {
      if (doc.exists) {
        document.getElementById("showposts").innerHTML += `
                <article class="post">
                  <header>
                    <h1>${doc.data().title}</h1>
                    <div class="small text-muted mb-2 font-italic">
                      ${doc.data().date.toDate().toLocaleDateString('en-US', options).split(' ').slice(1).join(' ')}
                      by ${doc.data().author}
                    </div>
                    <div class="mb-3">
                      <a class="badge badge-primary-soft text-primary text-capitalize mr-2">${doc.data().tag1}</a>
                      <a class="badge badge-primary-soft text-primary text-capitalize mr-2">${doc.data().tag2}</a>
                    </div>
                    <hr class="hr-lg">
                  </header>
                  <div>
                    ${doc.data().content}
                  </div>
                </article>
          `;

      } else {
        window.location = "index.html";
        console.log("NO")
      }
    });
}

let str = location.search.substring(1).split("/");
let link = str[str.length - 1];
showArtile(link);
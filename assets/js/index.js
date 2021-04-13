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

function showallposts() {
  document.getElementById("showposts").innerHTML = "";
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  firebase
    .firestore()
    .collection("posts")
    .where("status", "==", 3)
    .orderBy('date', 'desc')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        document.getElementById("showposts").innerHTML += `
                <div class="card mb-4">
                <div class="card-body p-5">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0 d-none d-lg-block me-5">
                      <img class="img-fluid blog-preview-img" src="assets/images/angular-icon.svg" alt="Article image" />
                    </div>
                    <div>
                      <div class="mb-3">
                        <h2 class="mb-0 blog-title">
                          <a href="article.html?${doc.data().slug}/${doc.id}">
                          ${doc.data().title}
                          </a>
                        </h2>
                        <div class="small text-muted mb-2">${doc.data().date.toDate().toLocaleDateString('en-US', options).split(' ').slice(1).join(' ')}</div>
                        <div class="mb-3">
                          <a class="badge badge-primary-soft text-primary text-capitalize mr-2" >${doc.data().tag1}</a>
                          <a class="badge badge-primary-soft text-primary text-capitalize mr-2" >${doc.data().tag2}</a>
                        </div>
                      </div>
                      <div>
                        <p>
                          ${doc.data().shortIntro}
                        </p>
                      </div>
                      <a class="btn btn-primary" href="article.html?${doc.data().slug}/${doc.id}">
                        Read more
                        <fa-icon class="ng-fa-icon ml-1">
                          <svg role="img" aria-hidden="true" focusable="false" data-prefix="far" data-icon="long-arrow-right" class="svg-inline--fa fa-long-arrow-right fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M295.515 115.716l-19.626 19.626c-4.753 4.753-4.675 12.484.173 17.14L356.78 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h344.78l-80.717 77.518c-4.849 4.656-4.927 12.387-.173 17.14l19.626 19.626c4.686 4.686 12.284 4.686 16.971 0l131.799-131.799c4.686-4.686 4.686-12.284 0-16.971L312.485 115.716c-4.686-4.686-12.284-4.686-16.97 0z">
                            </path>
                          </svg>
                        </fa-icon>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            `;
      });
    });
}

showallposts();

function clickpost(slug, id) {
  window.open("article.html?" + id);
}
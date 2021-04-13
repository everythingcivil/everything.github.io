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

DecoupledDocumentEditor
  .create(document.querySelector('.editor'), {

    toolbar: {
      items: [
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'outdent',
        'indent',
        '|',
        'todoList',
        'link',
        'blockQuote',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        '|',
        'horizontalLine',
        'undo',
        'redo',
        'code',
        'codeBlock',
        'highlight',
        'imageInsert',
        'MathType',
        'ChemType',
        'pageBreak',
        'subscript',
        'superscript',
        'specialCharacters'
      ]
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    licenseKey: '',
    placeholder: 'Type the content here!',
  })
  .then(editor => {
    window.editor = editor;
    document.querySelector('.document-editor__toolbar').appendChild(editor.ui.view.toolbar.element);
    document.querySelector('.ck-toolbar').classList.add('ck-reset_all');
  })
  .catch(error => {
    console.error('Oops, something went wrong!');
    console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
    console.warn('Build id: hxtoafb6a6p5-71lwtgfthn0i');
    console.error(error);
  });

function fetchdata(docid) {
  firebase
    .firestore()
    .collection("posts")
    .doc(docid)
    .get()
    .then((doc) => {
      document.getElementById("title").value = doc.data().title
      document.getElementById("tag1").value = doc.data().tag1
      document.getElementById("tag2").value = doc.data().tag2
      document.getElementById("author").value = doc.data().author
      document.getElementById("shortIntro").value = doc.data().shortIntro
      editor.setData(doc.data().content)
    })
    .catch((e) => {
      console.log(e);
    });
}


document.querySelector('#savecontent').addEventListener('click', () => {
  const editorData = editor.getData();
  let docid = location.search.substring(1);
  const postRef = firebase
    .firestore()
    .collection("posts")
    .doc(docid)

  postRef.get().then((doc) => {
    if (!doc.exists) return;
  });

  postRef.update({
      title: document.getElementById("title").value,
      tag1: document.getElementById("tag1").value,
      tag2: document.getElementById("tag2").value,
      author: document.getElementById("author").value,
      content: editorData,
    })
    .then((doc) => {
      var myAlert = document.getElementById('liveToast');
      var bsAlert = new bootstrap.Toast(myAlert);
      bsAlert.show();
      //console.log("Updated")
    })
    .catch((e) => {
      console.log(e);
    });
});

function goback() {
  if (confirm("Close Window?")) {
    close();
  }
}

fetchdata(location.search.substring(1));
function showallposts() {
document.getElementById("allposts").innerHTML = "";
firebase
    .firestore()
    .collection("posts")
    .get()
    .then((docs) => {
    docs.forEach((doc) => {
        document.getElementById("allposts").innerHTML += `
                <tr>
                    <td>${doc.data().title}</td>
                </tr><br/>
            `;
        });
    });
}

showallposts();
  
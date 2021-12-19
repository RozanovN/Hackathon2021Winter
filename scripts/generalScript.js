function makeBookmarksInvisible() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      document.getElementById("bookmarks").style.display = "none";
    }
  })
}
makeBookmarksInvisible();
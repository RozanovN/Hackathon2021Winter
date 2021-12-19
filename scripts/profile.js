function registerUser() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById("settings").style.display = "block";
      document.getElementsByClassName("content-container")[0].style.display = "block";
      document.getElementsByClassName("content-container")[1].style.display = "block";
      populateInfo();
      if (document.getElementById("unvaccinated").checked) {
        document.getElementById("vaccines").style.display = "none";
        document.getElementById("date").style.display = "none";
      }
    } else {
      var authContainer = document.getElementById("auth-container")
      var signUpContainer = document.getElementById("signup-container")
      var authOption = document.getElementById("auth-option")

      //Show and hide sign up and sign in window based on button clicked
      document.getElementById("old-user").addEventListener("click", function () {
        authOption.style.display = "none";
        authContainer.style.display = "block";
      })

      document.getElementById("new-user").addEventListener("click", function () {
        authOption.style.display = "none";
        signUpContainer.style.display = "block";
      })

      document.getElementById("back1").addEventListener("click", function () {
        authOption.style.display = "flex";
        authContainer.style.display = "none";
      })

      document.getElementById("back2").addEventListener("click", function () {
        authOption.style.display = "flex";
        signUpContainer.style.display = "none";
      })

      authOption.style.display = "flex";
    }
  });
}
registerUser();

function signIn() {
  var password = document.getElementById("password1").value
  var email = document.getElementById("email1").value
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // Signed in
      location.href = "../index.html"
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage)
    });
}

//Sign up new account for new users
function signUp() {
  var password = document.getElementById("password2").value
  var email = document.getElementById("email2").value
  var name = document.getElementById("name").value
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      db.collection("users").doc(user.uid).set({
        name: name,
        email: user.email
      })
        .then(function () {
          db.collection("bookmark").doc(user.uid).set({
            user: user.uid,
            bookmark: []
          }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("../user-info.html");
          })
        })
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage)
    });
}

function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var name = userDoc.data().name;
          var email = userDoc.data().email;
          var citizenship = userDoc.data().citizenship;
          var vaccinationStatus = userDoc.data().vaccinationStatus;
          var vaccineType = userDoc.data().vaccineType;
          var vaccinationDate = userDoc.data().vaccinationDate;

          document.getElementsByClassName("name")[0].innerHTML += name;
          document.getElementsByClassName("name")[1].value = name;
          document.getElementById("email").value = email;
          document.getElementById("country").value = citizenship;
          document.getElementById("name").value = name;
          if (vaccinationStatus == "Vaccinated, first dose") {
            document.getElementById("first-dose").checked = true;
          }
          else if (vaccinationStatus == "Vaccinated, second dose") {
            document.getElementById("second-dose").checked = true;
          }
          else if (vaccinationStatus == "Vaccinated, third dose") {
            document.getElementById("third-dose").checked = true;
          }
          else {
            document.getElementById("unvaccinated").checked = true;
          }
          document.getElementById("vaccines").value = vaccineType;
          document.getElementById("day").value = vaccinationDate[0];
          document.getElementById("month").value = vaccinationDate[1];
          document.getElementById("year").value = vaccinationDate[2];
        })
    }
  })
}

function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.assign("/index.html")
  }).catch((error) => {
    // An error happened.
  });
}
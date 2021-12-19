function registerUser() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      populateInfo();
      if (document.getElementById("unvaccinated").checked) {
        document.getElementByID("vaccines").style.visibility = "hidden";
        document.getElementByID("date").style.visibility = "hidden";
      }
    } else {
      document.getElementById("settings").style.visibility = "hidden";
      document.getElementsByClassName("content-container")[0].style.visibility = "hidden";
      document.getElementsByClassName("content-container")[1].style.visibility = "hidden";
      // initialize ui for authentication
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user; // get the user object from the Firebase authentication database
            if (authResult.additionalUserInfo.isNewUser) { //if new user
              db.collection("users").doc(user.uid)
                .set({ //write to firestore. We are using the UID for the ID in users collection
                  name: user.displayName, //"users" collection
                  email: user.email //with authenticated user's ID (user.uid)
                }).then(function () {
                  console.log("New user added to firestore");
                  window.location.assign("preferences.html"); //re-direct to fpreferences.html after signup
                })
                .catch(function (error) {
                  console.log("Error adding new user: " + error);
                });
            } else {
              return true; // user already registered
            }
            return false; // error
          },
          uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '../index.html',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>', // we don't have any
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>' // we don't have any
      };
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
}
registerUser();


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
        document.getElementByID("email").value = email;
        document.getElementByID("country").value = citizenship;
        document.getElementByID("name").value = name;
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
        document.getElementByID("vaccines").value = vaccineType;
        document.getElementByID("day").value = vaccinationDate[0];
        document.getElementByID("month").value = vaccinationDate[1];
        document.getElementByID("year").value = vaccinationDate[2];
      })
    }
  })
}
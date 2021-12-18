function registerUser() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById("content-container").style.visibility = "visible"
    } else {
      document.getElementById("content-container").style.visibility = "hidden"
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
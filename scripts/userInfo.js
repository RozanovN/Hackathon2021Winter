document.getElementById("form").style.display = "block";

var radioButton = document.getElementById("unvaccinated");
document.getElementById("radio-1").addEventListener("click", () => {
  document.getElementById("vaccines-type").style.display = "flex";
  document.getElementById("date").style.display = "flex";
})
document.getElementById("radio-2").addEventListener("click", () => {
  document.getElementById("vaccines-type").style.display = "flex";
  document.getElementById("date").style.display = "flex";
})
document.getElementById("radio-3").addEventListener("click", () => {
  document.getElementById("vaccines-type").style.display = "flex";
  document.getElementById("date").style.display = "flex";
})
document.getElementById("radio-4").addEventListener("click", () => {
  document.getElementById("vaccines-type").style.display = "none";
  document.getElementById("date").style.display = "none";
})

function save() {
  firebase.auth().onAuthStateChanged(user => {
    currentUser = db.collection("users").doc(user.uid) // gets user collection
    var citizenship = document.getElementById("country").value;
    var vaccinationStatus = null;
    if (document.getElementById("first-dose").checked) {
      vaccinationStatus = "Vaccinated, first dose";
    }
    else if (document.getElementById("second-dose").checked) {
      vaccinationStatus = "Vaccinated, second dose";
    }
    else if (document.getElementById("third-dose").checked) {
      vaccinationStatus = "Vaccinated, third dose";
    }
    else {
      vaccinationStatus = document.getElementById("unvaccinated").value;
    }
    if (vaccinationStatus != "Unvaccinated") {
      console.log("1");
      var vaccineType = document.getElementById("vaccines").value;
      var vaccinationDate = [];
      vaccinationDate.push(document.getElementById("day").value);
      vaccinationDate.push(document.getElementById("month").value);
      vaccinationDate.push(document.getElementById("year").value);
      currentUser.update({
        "vaccineType": vaccineType,
        "vaccinationDate": vaccinationDate
      })
    }
    currentUser.update({
      "citizenship": citizenship,
      "vaccinationStatus": vaccinationStatus
    })
    .then(() => {
        // go to the next page
        window.location.assign("../index.html");
    })
  })
}
var radioButton = document.getElementById("unvaccinated");
radioButton.addEventListener('change', function () {
  if (this.checked) {
    document.getElementsByClassName("input-container")[2].style.display = "none";
    document.getElementsByClassName("input-container")[3].style.display = "none";
  }
  else if (document.getElementById("first-dose").checked || document.getElementById("second-dose").checked || document.getElementById("third-dose").checked) {
    
  }
})


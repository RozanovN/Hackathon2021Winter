var xhr = new XMLHttpRequest();

xhr.withCredentials = true;

xhr.onload = function () {
    var data = JSON.parse(this.response);
    // console.log(data);

    data.response.forEach(country => {
        countryName = country.country;
        activeCases = country.cases.active;
        newCases = country.cases.new;
        if (newCases == null) {
            newCases = "0"
        }
        if (activeCases == null) {
            activeCases = "0"
        }

        card = document.createElement("div")
        card.setAttribute("class", "card")

        countryImage = document.createElement("img")
        countryImage.setAttribute("class", "news-img")
        countryImage.setAttribute("src", "https://dummyimage.com/600x400/000/fff")
        card.appendChild(countryImage)

        cardDescription = document.createElement("div")
        cardDescription.setAttribute("class", "card-description")

        countryTitle = document.createElement("div")
        countryTitle.setAttribute("class", "country-name")
        countryTitle.innerHTML = countryName

        countryNewCases = document.createElement("div")
        countryNewCases.setAttribute("class", "country-new-cases")
        countryNewCases.innerHTML = `New Cases: ${newCases}`

        countryActiveCases = document.createElement("div")
        countryActiveCases.setAttribute("class", "country-active-cases")
        countryActiveCases.innerHTML = `Active Cases: ${activeCases}`

        cardDescription.appendChild(countryTitle)
        cardDescription.appendChild(countryNewCases)
        cardDescription.appendChild(countryActiveCases)

        card.appendChild(cardDescription)
        card.setAttribute("data-newcase", newCases)

        section = document.querySelector("section")
        section.appendChild(card)
    });
};

xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "f7328ad34dmsh89abcc0730b26ddp1b9d14jsnb831f0b29bce");

xhr.send();

function sortAsc() {
    console.log("testing")
    let itemList = []

    let cards = document.querySelectorAll(".card")
    cards.forEach(function (card) {
        itemList.push(card)
    })

    itemList.sort(function (a, b) {
        if (a.dataset.newcase != "0") {
            newCase1 = parseInt(a.dataset.newcase.substr(1))
        }
        else {
            newCase1 = 0
        }
        if (b.dataset.newcase != "0") {
            newCase2 = parseInt(b.dataset.newcase.substr(1))
        }
        else {
            newCase2 = 0
        }
        return newCase1 - newCase2
    })
   
    let section = document.querySelector("section")
    let sortedCards = []
    for (let i = 0; i < itemList.length; i++) {
        card = itemList[i]
        sortedCards.push(card)
    }
    for (let i = 0; i < itemList.length; i++) {
        itemList[i].remove()
    }
    for (let i = 0; i < sortedCards.length; i++) {
        card = sortedCards[i]
        section.appendChild(card)
    }
}

document.querySelector("#sort-option").addEventListener("click", sortAsc)
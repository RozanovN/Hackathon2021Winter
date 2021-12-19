function populate() {
    var xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.onload = function () {

        var data = JSON.parse(this.response);

        data.response.sort(function (a, b) {
            if (a.country.toUpperCase() < b.country.toUpperCase()) {
                return -1;
            }
            if (a.country.toUpperCase() > b.country.toUpperCase()) {
                return 1;
            }
            return 0;
        })

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
            countryImage.setAttribute("class", "country-img")
            countryImage.setAttribute("data-country", countryName)
            countryImage.setAttribute("src", "https://dummyimage.com/600x400/000/fff&text=loading...")
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
            card.setAttribute("data-country", countryName)
            card.setAttribute("id", countryName.toLowerCase())

            section = document.querySelector("section")
            section.appendChild(card)

        });

        getFlag()
    };

    xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
    xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "f7328ad34dmsh89abcc0730b26ddp1b9d14jsnb831f0b29bce");

    xhr.send();
}

function getFlag() {
    countriesImg = document.querySelectorAll(".country-img")
    countriesImg.forEach(img => {
        countryName = img.dataset.country
        if (countryName == "UK") {
            path = "https://restcountries.com/v3.1/alpha/gb"
        }
        else if (countryName == "New-Zealand") {
            path = "https://restcountries.com/v3.1/alpha/nz"
        }
        else if (countryName == "USA") {
            path = "https://restcountries.com/v3.1/name/usa"
        }
        else if (countryName == "Hong-Kong") {
            path = "https://restcountries.com/v3.1/alpha/hk"
        }
        else if (countryName == "Saudi-Arabia") {
            path = "https://restcountries.com/v3.1/name/saudi"
        }
        else if (countryName == "S-Korea") {
            path = "https://restcountries.com/v3.1/alpha/kr"
        }
        else {
            path = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        }
        xhr = new XMLHttpRequest();
        xhr.onload = function () {
            data = JSON.parse(this.response);
            try {
                img.setAttribute("src", data[0].flags.png)
            }
            catch {
                img.setAttribute("src", "https://dummyimage.com/600x400/000/ffffff&text=image+not+available")
            }
        };
        xhr.open("GET", path);
        xhr.send();
    })
}

populate()

// READ data from CSV and WRITE covid deaths / infections to database
async function getCSVdata() {
    const response = await fetch("COVID19data.csv"); //send get request
    const data = await response.text(); //get file response
    const list = data.split('\n').slice(1); //get line 
    list.forEach(row => {
        const columns = row.split(","); //get token 
        const countryname = columns[0]; // countryname
        const geographicregion = columns[1]; // geographic region
        const cumulativecasespercapita = parseInt(columns[3]); // total cases per capita
        const newcasesperweekpercapita = parseInt(columns[5]); // new cases per week per capita
        const deathslastweekpercapita = parseInt(columns[10]); // deaths last week per capita
        const deathlast24hours = parseInt(columns[11]); // deaths in last 24 hours

        db.collection("covid-information").doc(countryname).set({ //write to firestore
            country_name: countryname,
            geographic_region: geographicregion,
            total_cases_per_capita: cumulativecasespercapita,
            new_weekly_cases_per_capita: newcasesperweekpercapita,
            new_weekly_deaths_per_capita: deathslastweekpercapita,
            new_daily_deaths: deathlast24hours
        })
    });
}
// getCSVdata();

// READ data from CSV and WRITE vaccination data to database
async function getCSVdatasecond() {
    const response = await fetch("vaccination-data.csv"); //send get request
    const data = await response.text(); //get file response
    const list = data.split('\n').slice(1); //get line 
    list.forEach(row => {
        const columns = row.split(","); //get token 
        const countryname = columns[0]; // countryname
        const lastupdated = columns[4]; // date information was updated
        const totalvaccinationsper100 = parseInt(columns[7]); // total doses per capita
        const minimumonedoseper100 = parseInt(columns[8]); // population per capita with at least one dose
        const fullyvaccinatedper100 = parseInt(columns[10]); // fully vaccinated population per capita
        const totalnumbervaccines = columns[11]; // different types of vaccines administered

        db.collection("vaccination-information").doc(countryname).set({ //write to firestore
            country_name: countryname,
            date_last_updated: lastupdated,
            total_doses_per_capita: totalvaccinationsper100,
            at_least_one_dose_per_capita: minimumonedoseper100,
            fully_vaccinated_per_capita: fullyvaccinatedper100,
            total_vaccine_types: totalnumbervaccines
        })
    });
}

// getCSVdatasecond();

function sortCaseAsc() {
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

    document.querySelector("#sort-option").innerHTML = "Least new case"
}

function sortCaseDes() {
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
        return newCase2 - newCase1
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

    document.querySelector("#sort-option").innerHTML = "Most new case"
}

function sortAlpha() {
    let itemList = []

    let cards = document.querySelectorAll(".card")
    cards.forEach(function (card) {
        itemList.push(card)
    })

    itemList.sort(function (a, b) {
        if (a.dataset.country.toUpperCase() < b.dataset.country.toUpperCase()) {
            return -1;
        }
        if (a.dataset.country.toUpperCase() > b.dataset.country.toUpperCase()) {
            return 1;
        }
        return 0;
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

    document.querySelector("#sort-option").innerHTML = "Alphabatical order"
}

document.querySelector("#sort-icon").addEventListener("click", sortOption)

function sortOption() {
    current = document.querySelector("#sort-option").innerHTML
    if (current == "Alphabatical order") {
        sortCaseAsc()
    }
    if (current == "Least new case") {
        sortCaseDes()
    }
    if (current == "Most new case") {
        sortAlpha()
    }
}

function searchCountry() {
    searchQuery = document.getElementById("search-input").value.toLowerCase()
    if (searchQuery) {
        try {
            allCountries = document.querySelectorAll(".card")
            allCountries.forEach(country => {
                country.style.opacity = "0.3"
                country.style.transform = "scale(1)"
            })
            targetCountry = document.getElementById(searchQuery)
            targetCountry.style.opacity = "1"
            targetCountry.style.transform = "scale(1.1)"
            targetCountry.scrollIntoView({
                block: "center",
                behavior: "smooth"
            })
        }
        catch {
            console.log("Not found.")
        }
    }
}

function resetCard() {
    allCountries = document.querySelectorAll(".card")
    allCountries.forEach(country => {
        country.style.opacity = "1"
        country.style.transform = "scale(1)"
    })
}

document.querySelector("#search-icon").addEventListener("click", searchCountry)
document.querySelector("section").addEventListener("click", resetCard)

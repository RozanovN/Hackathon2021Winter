var xhr = new XMLHttpRequest();

xhr.withCredentials = true;

xhr.onload = function () {
    var data = JSON.parse(this.response);

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

        section = document.querySelector("section")
        section.appendChild(card)
    });
};

xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "f7328ad34dmsh89abcc0730b26ddp1b9d14jsnb831f0b29bce");

xhr.send();



// READ data from CSV and WRITE to database
async function getCSVdata() {
    const response = await fetch("vaccination-data.csv"); //send get request
    const data = await response.text(); //get file response
    const list = data.split('\n').slice(1); //get line 
    list.forEach(row => {
        const columns = row.split(","); //get token 
        const countryname = columns[0]; // countryname
        console.log(countryname);
        const geographicregion = columns[1]; // geographic region
        // const cumulativecasespercapita = parseInt(columns[3]); // author name
        // const newcasesperweekpercapita = parseInt(columns[5]);
        // const deathslastweekpercapita = parseInt(columns[10]);
        // const deathlast24hours = parseInt(columns[11]);

        db.collection("covid-information").add({ //write to firestore
            country_name: countryname,
            geographic_region: geographicregion,
            // total_cases_per_capita: cumulativecasespercapita,
            // new_weekly_cases_per_capita: newcasesperweekpercapita,
            // new_weekly_deaths_per_capita: deathslastweekpercapita,
            // new_daily_deaths: deathlast24hours
        })
    });

    getCSVdata();
}
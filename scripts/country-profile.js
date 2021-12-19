var country = "Argentina"

function displayCovidData() {
    db.collection("vaccination-information").doc(country).onSnapshot(vaccineDocs => {
        document.getElementById("firstdose").innerText = vaccineDocs.data().at_least_one_dose_per_capita;
        document.getElementById("lastupdated").innerText = vaccineDocs.data().date_last_updated;
        document.getElementById("fullyvaccinated").innerText = vaccineDocs.data().fully_vaccinated_per_capita;
        document.getElementById("totaldoses").innerText = vaccineDocs.data().total_doses_per_capita;
        document.getElementById("vaccinetype").innerText = vaccineDocs.data().total_vaccine_types;
    });

    db.collection("covid-information").doc(country).onSnapshot(covidDocs => {
        document.getElementById("geographic").innerText = covidDocs.data().geographic_region;
        document.getElementById("dailydeaths").innerText = covidDocs.data().new_daily_deaths;
        document.getElementById("weeklycases").innerText = covidDocs.data().new_weekly_cases_per_capita;
        document.getElementById("weeklydeaths").innerText = covidDocs.data().new_weekly_deaths_per_capita;
        document.getElementById("totalcases").innerText = covidDocs.data().total_cases_per_capita;
        document.getElementById("countryname").innerText = covidDocs.data().country_name;
    });
}

displayCovidData();
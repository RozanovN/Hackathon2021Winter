var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://newsapi.org/v2/everything?q=(+covid AND +travel ban) OR (+covid AND +restrictions AND +cases) OR (+covid AND +vaccince AND +cases)&language=en&from=2021-12-18&pageSize=100&page=1&sortBy=popularity&apiKey=561b27fec7c643e7931cce90920199a7', true)

xhr.onload = function () {
    var data = JSON.parse(this.response)

    data.articles.forEach(news => {
        card = document.createElement("div")
        card.setAttribute("class", "card")

        newsImg = document.createElement("img")
        newsImg.setAttribute("class", "news-img")
        if (news.urlToImage == "") {
            newsImg.setAttribute("src", "https://dummyimage.com/600x400/000/fff")
        }
        else {
            newsImg.setAttribute("src", news.urlToImage)
        }
        card.appendChild(newsImg)

        newsDescription = document.createElement("div")
        newsDescription.setAttribute("class", "card-description")

        newsTitle = document.createElement("div")
        newsTitle.setAttribute("class", "news-title")
        newsTitle.innerHTML = news.title
        newsDescription.appendChild(newsTitle)

        card.appendChild(newsDescription)

        section = document.querySelector("section")
        section.appendChild(card)
    });
}

xhr.send()

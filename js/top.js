let data = []
let page = 1

const topRating = document.querySelector(".top_rating")
const pagination = document.querySelector(".movies_pagination")
const paginationNumbers = document.querySelectorAll(".movies_pagination-item")

const inputYear = document.querySelector(".filter_input.input-year")
const inputTitle = document.querySelector(".filter_input.input-title")
//фильтры
inputTitle.addEventListener('change', function () {
    const title = inputTitle.value.twolowerCase().trim()
    if (title) {
     const filteredData = data.filter(film => film.title.twolowerCase().includes(title))
     console.log(filteredData)

    if (filteredData.length == 0) {
        topRating.innerHTML = "<p class = 'not-found' >Фильмы не найдены</p>"
        pagination.style.display = "none"
     }
     else{
        topRating.innerHTML = ""
        pagination.style.display = "none"

        filteredData.forEach(film => draw_card(film, data.indexOf(film) + 1))
     }
    }

    else{
        top.innerHTML = ""
        draw_page(page)
        pagination.style.display = "flex"
     }

})

inputYear.addEventListener("click", function (){
     const year = inputYear.value

     if (year) {
     const filteredData = data.filter(film => film.year == year)
     console.log(filteredData)

     if (filteredData.length == 0) {
        topRating.innerHTML = "<p class = 'not-found' >Фильмы не найдены</p>"
        pagination.style.display = "none"
     }
     else{
        topRating.innerHTML = ""
        pagination.style.display = "none"

        filteredData.forEach(film => draw_card(film, data.indexOf(film) + 1))
     }

     }

     else{
        top.innerHTML = ""
        draw_page(page)
        pagination.style.display = "flex"
     }


})

pagination.addEventListener("click", function() {
    if (event.target.classList.contains("item--prev")) {
        if (page != 1) {
            page--
            topRating.innerHTML = ""
            draw_page(page)
        }
        paginationNumbers.forEach(item => {
            if (item.textContent == page) {
                item.classList.add("item--active")
            }
            else {
                item.classList.remove("item--active")
            }
        });
    }

    

    else if (event.target.classList.contains("item--next")) {
        if (page != 3) {
            page++
            topRating.innerHTML = ""
            draw_page(page)
        }
        paginationNumbers.forEach(item => {
            if (item.textContent == page) {
                item.classList.add("item--active")
            }
            else {
                item.classList.remove("item--active")
            }
        });
        }
    

    else if (event.target.classList.contains("movies_pagination-item") && !event.target.classList.contains("item--active")) {
        topRating.innerHTML = ""
        draw_page(+event.target.textContent)
        page = +event.target.textContent
    
        paginationNumbers.forEach(item => {
            item.classList.remove("item--active")
    });

        event.target.classList.add("item--active");
}
});    


function draw_page(page, cards_per_page = 10){
    start = сards_per_page * page - cards_per_page
    end = start + cards_per_page
    
    if (end > data.length) end = data.length

    for (let i = start; i < start + cards_per_page; i++) {
        draw_card(data[i], i+1)
    }
}

function draw_card(film, place) {
    let topClass = ""
    
    if (place <= 3) topClass = "grand-place"
    else if (place <= 10) topClass = "top-place"
    else if (place <= 20) topClass = "middle-place"
    else if (place <= 25) topClass = "bottom-place"



    topRating.innerHTML += `
    <div class="top_rating-card">
        <h2 class="top_rating-place ${topClass}">${place}</h2>
        <img src="http://185.72.144.247:7757/${film.poster_URL}" alt="rating-img" class="top_rating-img">
        <div class="top_rating-info">
            <h3 class="top_rating-title"><a class = "top_rating-link" href = "movie.html?id=${film.id}">${film.title}</a></h3>
            <p class="top_rating-desc">${film.desc}</p>
            <p class="top_rating-number">rating ${film.rating}</p>
        <div class="top_rating-data">
            <div class="top_rating-data item">
                <h4 class="data-item_title">Год выпуска</h4>
                <p class="data-item_text">${film.year}</p>
            </div>
        <div class="top_rating-data item">
            <h4 class="data-item_title">Возраст</h4>
            <p class="data-item_text">${film.age_rating}+</p>
        </div>
        <div class="top_rating-data item">
            <h4 class="data-item_title">Длительность</h4>
            <p class="data-item_text">${film.duration} мин</p>
        </div>
            </div>
        </div>
    </div>
    `
}

async function get_top() {
    try {
        const res = await fetch(`http://185.72.144.247:7757/top25`)
        if (!res.ok) {
            throw new Error("Ошибка! " + res.status)
        }

        data = await res.json()
        console.log(data)

        draw_page(1)
    }
        catch (err) {
            console.error(err)
        }
}
window.addEventListener('load', function() {
    get_top()
})
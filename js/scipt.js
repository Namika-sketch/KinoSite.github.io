const moviesCards = document.querySelector(".movies_cards")
let data = []

const number1 = document.querySelector(".number-1")
const number2 = document.querySelector(".number-2")
const number3 = document.querySelector(".number-3")
const number4 = document.querySelector(".number-4")
const number5 = document.querySelector(".number-5")

const numbers = document.querySelectorAll(".movies_pagination-item")

numbers[0].addEventListener('click', function(){
    if (!this.classList.contains("item--active")){
         moviesCards.innerHTML = ""
         for (let i = 0; i < 20; i++){
            draw_card(data[i])
        }

        numbers.forEach(n => {
            n.classList.remove("item--active")
        })

        this.classList.add("item--active")
    }
})

numbers[1].addEventListener('click', function(){
    if (!this.classList.contains("item--active")){
         moviesCards.innerHTML = ""
         for (let i = 20; i < 40; i++){
            draw_card(data[i])
        }

        numbers.forEach(n => {
            n.classList.remove("item--active")
        })

        this.classList.add("item--active")
    }
})

numbers[2].addEventListener('click', function(){
    if (!this.classList.contains("item--active")){
         moviesCards.innerHTML = ""
         for (let i = 40; i < 60; i++){
            draw_card(data[i])
        }

        numbers.forEach(n => {
            n.classList.remove("item--active")
        })

        this.classList.add("item--active")
    }
})

numbers[3].addEventListener('click', function(){
    if (!this.classList.contains("item--active")){
         moviesCards.innerHTML = ""
         for (let i = 60; i < 80; i++){
            draw_card(data[i])
        }

        numbers.forEach(n => {
            n.classList.remove("item--active")
        })

        this.classList.add("item--active")
    }
})

numbers[4].addEventListener('click', function(){
    if (!this.classList.contains("item--active")){
         moviesCards.innerHTML = ""
         for (let i = 80; i < 100; i++){
            draw_card(data[i])
        }

        numbers.forEach(n => {
            n.classList.remove("item--active")
        })

        this.classList.add("item--active")
    }
})


function draw_card(film) {
    moviesCards.innerHTML += `
    <div class="movies_card">
        <img class="movies_card-img" src="http://185.72.144.247:7757${film.poster_URL}" alt="card img">
        <h3 class="movies_card-title">${film.title}</h3>
        <div class="movies_card-wrapper">
            <p class="movies_card-data">${film.year} год</p>
            <p class="movies_card-data">Рейтинг: ${film.rating}</p>
         </div>
        <a class="movies_card-link" href="movie.html?id=${film.id}">Перейти</a>
    </div>
    `
}

async function get_films() {
    try{
        const res = await fetch("http://185.72.144.247:7757/films")

        if(!res.ok){
            throw new Error("Ошибка!" + res.status);
        }

       const data = await res.json()
       console.log(data)

       for (let i = 0; i < 20; i++){
            draw_card(data[i])
        }
    }
    catch(err){
        console.error(err);
    }
}

window.addEventListener("load", function(){
    get_films()
})
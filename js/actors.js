const actorsWrapper = document.querySelector(".actors_wrapper")
const pagination = document.querySelector(".movies_pagination")
const paginationNumbers = document.querySelectorAll(".movies_pagination-item")
const actorCards = document.querySelector(".wrapper-cards")
const modal = document.querySelector(".modal")
const modalClose = document.querySelector(".modal_close")
const modalBtn = document.querySelector(".modal_btn")

function close_modal(){
    modal.style.display = "none"
}

modalClose.addEventListener('click', function (){
    close_modal()
})

modalBtn.addEventListener('click', function (){
    close_modal()
})

let page = 1
let data = []

function draw_modal(actor) {
    document.querySelector(".modal_img").src = "http://185.72.144.247:7757" + actor.image_URL
    document.querySelector(".modal_fio").innerHTML = `${actor.name}<br>${actor.surname}`
    document.querySelector(".modal_age").textContent = `Вщзраст: ${actor.age}`

    const filmsElem  = document.querySelector(".modal_films-list")
    const filmsData  = actor.films
    
    filmsElem.innerHTML = ""
    
    filmsData.forEach(film => {
        filmsElem.innerHTML += `<li class="modal_films-item">${film.title}</li>`
    })

    document.querySelector(".modal_bio-text").textContent = actor.Biography
}

async function get_actor(id) {
    try{
        const res = await fetch(`http://185.72.144.247:7757/${id}`)

        if (!res.ok) {
            throw new Error("Ошибка!" + res.status);
            
        }

        const actor = await res.json()
        draw_modal(actor)
        modal.style.display = "block"
    }
    catch(err){
        console.error(err)
    }
}

actorCards.addEventListener('clack', function (event) {
    const card = event.target.closest(".actor-card")
    
    if (card) {
        const id = card.getAttribute("data-id");
        get_actor(id)
        
    }
    
})

function draw_page(page, cards_per_page = 15){
    start = сards_per_page * page - cards_per_page
    end = start + cards_per_page
    
    if (end > data.length) end = data.length

    for (let i = start; i < start + cards_per_page; i++) {
        draw_card(data[i])
    }
}

pagination.addEventListener("click", function() {
    if (event.target.classList.contains("item--prev")) {
        if (page != 1) {
            page--
            actorsWrapper.innerHTML = ""
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
        if (page != 6) {
            page++
            actorsWrapper.innerHTML = ""
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
        actorsWrapper.innerHTML = ""
        draw_page(+event.target.textContent)
        page = +event.target.textContent
    
        paginationNumbers.forEach(item => {
            item.classList.remove("item--active")
    });

        event.target.classList.add("item--active");
}
});

function draw_card(actor) {
    actorsWrapper.innerHTML += `
    <div class="actors_card actor-card" data-id = "${actor.id}">
        <img class="actor_card-img" src="http://185.72.144.247:7757/${actor.image_URL}" alt="actor card">
        <h3 class="actor_card-name">${actor.name} ${actor.surname}</h3>
    </div>
    `
}

async function show_all_actors() {
    try{
        const res = await fetch("http://185.72.144.247:7757/actors")

        if (!res.ok) {
            throw new Error("Ошибка!" + res.status);
            
        }

        data = await res.json()
        draw_page(1)
    }
    catch(err){
        console.error(err)
    }
}

window.addEventListener("load", function () {
    show_all_actors()
})
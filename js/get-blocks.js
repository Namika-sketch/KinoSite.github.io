fetch("header.html")
.then(rwsponse => response.text())
.then( data => {
    document.querySelector(".header-placeholder").outerHTML = data

    const burger = document.querySelector(".header_menu-burger")
    const menulist = document.querySelector(".header_menu-list")

    burger .addEventListener('click', function() {
    menulist.classList.toggle("menu-list--active")
    })
})

fetch("form.html")
.then(rwsponse => response.text())
.then( data => {
    document.querySelector(".subscribe-placeholder").outerHTML = data
})

fetch("footer.html")
.then(rwsponse => response.text())
.then( data => {
    document.querySelector(".footer-placeholder").outerHTML = data

    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const btn = document.querySelector(".subscribe_form-btn")

    btn.addEventListener('click', function(event) {
        event.preventDefault()
        if (!name.value.trim()) {
            name.style.border = '1px solid #873337'
            return
        }
        name.style.border = '1px solid #131313'

        if (!email.value.trim()){
            email.style.border = '1px solid #873337'
            return
        }
        email.style.border = '1px solid #131313'

        alert(`Вы подписались на рассылку! Ваше имя: ${name.value}, ваша почта: ${email.value}`)
        name.value = ""
        email.value = ""
    })
})


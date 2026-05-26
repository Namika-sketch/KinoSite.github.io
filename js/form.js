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
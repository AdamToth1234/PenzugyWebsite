const navbar = document.querySelector(".navbar")
const closeButton = document.querySelector(".close")
const hamburger = document.querySelector(".hamburger")
const overlay = document.querySelector(".overlay")

hamburger.addEventListener("click", () => {
    overlay.classList.add("transform")
})

closeButton.addEventListener("click", () => {
    overlay.classList.remove("transform")
})
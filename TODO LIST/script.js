var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popupbox")
var addbtn = document.getElementById("addpopup-button")


addbtn.addEventListener("click", function () {
    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
})

var cancelbtn = document.getElementById("cancel-popup")

cancelbtn.addEventListener("click", function (event) {
    event.preventDefault()
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
})

var container = document.querySelector(".container")
var addbook = document.getElementById("addbook")
var booktitle = document.getElementById("booktitle-input")
var bookauthor = document.getElementById("bookauthor-input")
var bookdesc = document.getElementById("bookdesc-input")


addbook.addEventListener("click", function (event) {
    event.preventDefault()
    var div = document.createElement("div")
    div.setAttribute("class", "book-container")
    div.innerHTML = `<h2>${booktitle.value}</h2>
    <h5>${bookauthor.value}</h5>
    <p>${bookdesc.value}</p>
    <button onclick="delbook(event)">Delete</button>`
    container.append(div)
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"

})
function delbook(event) {
    event.target.parentElement.remove()
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-cb817-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
let shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDb, inputValue)
    
    clearInputFieldEl()


})

onValue(shoppingListInDb, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())

    clearShoppingListEl()
    
    for(let i = 0; i < itemsArray.length; i++) {
        let itemValue = itemsArray[i]
        appendItemToShoppingListEl(itemValue)
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}
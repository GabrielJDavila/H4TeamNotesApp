import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://h4-team-notes-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const clientNotesInDB = ref(database, "client-notes")
const workoutNotesInDB = ref(database, "workout-notes")
const gymEventsInDB = ref(database, "events-notes")

const text = document.getElementById("text-input")
const selectMenu = document.getElementById("select-menu")
const btn = document.getElementById("btn")
const notesSection = document.getElementById("notes-section")

btn.addEventListener("click", () => {
    let textValue = text.value
    
    if(textValue) {
        if(selectMenu.value == "workout-notes") {
            console.log("workout")
            push(workoutNotesInDB, textValue)
        } else if(selectMenu.value == "client-notes") {
            console.log("client")
            push(clientNotesInDB, textValue)
        } else {
            console.log("events")
            push(gymEventsInDB, textValue)
        }

        clearInputFields()
    }
})

function clearInputFields() {
    text.value = ""
}

onValue(clientNotesInDB, (snapshot) => {
    if(snapshot.exists()){
        let clientDataArray = Object.entries(snapshot.val())
        clearInnerHTML()
        for(let i = 0; i < clientDataArray.length; i++) {
            let currentClientDataItem = clientDataArray[i]
            
            appendToDoc(currentClientDataItem)
        }

    }
})

function clearInnerHTML() {
    notesSection.innerHTML = ""
}

function appendToDoc(item) {
    let html = ""
    let itemText = item[1]
    console.log(itemText)

    html = `
        <div class="rendered-text-div">
            <p class="rendered-text">${itemText}</p>
        </div
    `
    notesSection.insertAdjacentHTML("afterbegin", `${html}`)
}
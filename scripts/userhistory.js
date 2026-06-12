import {history} from "./gameboard.js"

const resetHistory = document.querySelector(".reset")
const showHistory = document.querySelector(".history")

const historyPageBackBtn = document.querySelector(".user-history-screen .back-btn svg")

const userHistoryScreen = document.getElementById("user-history-screen")
const settingsScreen = document.getElementById("settings-screen")

const easyDraw = document.querySelector("#user-history-screen .main-content .easy-ai .draw")
const easyWin = document.querySelector("#user-history-screen .main-content .easy-ai .win")
const easyLoss = document.querySelector("#user-history-screen .main-content .easy-ai .loss")
const easyTotalGames = document.querySelector("#user-history-screen .main-content .easy-ai .total-games")

const toughDraw = document.querySelector("#user-history-screen .main-content .tough-ai .draw")
const toughWin = document.querySelector("#user-history-screen .main-content .tough-ai .win")
const toughLoss = document.querySelector("#user-history-screen .main-content .tough-ai .loss")
const toughTotalGames = document.querySelector("#user-history-screen .main-content .tough-ai .total-games")

const unbeatableDraw = document.querySelector("#user-history-screen .main-content .unbeatable-ai .draw")
const unbeatableWin = document.querySelector("#user-history-screen .main-content .unbeatable-ai .win")
const unbeatableLoss = document.querySelector("#user-history-screen .main-content .unbeatable-ai .loss")
const unbeatableTotalGames = document.querySelector("#user-history-screen .main-content .unbeatable-ai .total-games")

historyPageBackBtn.addEventListener(("click"), () => {
    userHistoryScreen.classList.toggle("hidden")
    settingsScreen.classList.toggle("hidden")
})

function updateLocalStorage() {
    localStorage.setItem("history", JSON.stringify(history))
}

function getLocalStorage() {
    const gethistory = localStorage.getItem("history")

    if(gethistory === null){
        updateLocalStorage()
        return gethistory
    }

    return JSON.parse(gethistory)
}

function updateUI(){
    const gethistory = getLocalStorage()

    if(gethistory !== null){
        easyDraw.textContent = `Draws: ${gethistory.easy[0]}`
        easyWin.textContent = `Wins: ${gethistory.easy[1]}`
        easyLoss.textContent = `Loss: ${gethistory.easy[2]}`
        easyTotalGames.textContent = `Total Games: ${gethistory.easy[0] + gethistory.easy[1] + gethistory.easy[2]}`

        toughDraw.textContent = `Draws: ${gethistory.tough[0]}`
        toughWin.textContent = `Wins: ${gethistory.tough[1]}`
        toughLoss.textContent = `Loss: ${gethistory.tough[2]}`
        toughTotalGames.textContent = `Total Games: ${gethistory.tough[0] + gethistory.tough[1] + gethistory.tough[2]}`

        unbeatableDraw.textContent = `Draws: ${gethistory.unbeatable[0]}`
        unbeatableLoss.textContent = `Loss: ${gethistory.unbeatable[2]}`
        unbeatableTotalGames.textContent = `Total Games: ${gethistory.unbeatable[0] + gethistory.unbeatable[1] + gethistory.unbeatable[2]}`
    }

}

function clearHistory(){
    localStorage.removeItem("history")
    history.easy = [0, 0, 0]
    history.tough = [0, 0, 0]
    history.unbeatable = [0, ,0, 0]
}

showHistory.addEventListener(("click"), () => {
    userHistoryScreen.classList.toggle("hidden")
    settingsScreen.classList.toggle("hidden")
    updateLocalStorage()
    updateUI()
})

resetHistory.addEventListener(("click"), () => {
    clearHistory()
})

window.addEventListener("beforeunload", () => {
    updateLocalStorage();
    updateUI()
});
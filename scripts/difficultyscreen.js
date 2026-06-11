import { gameState, updateDisplayNames} from "./state.js";

const computerBtn = document.querySelector(".single-player")
const playerBtn = document.querySelector(".two-player")
const startScreen = document.getElementById("start-screen")
const difficultyScreen = document.getElementById("difficulty-screen")
const settingsScreen = document.getElementById("settings-screen")
const playerScreen = document.getElementById("player-screen")
const settingsBtnStartPage = document.querySelector("#start-screen .settings-btn")
const settingsPageBackBtn = document.querySelector("#settings-screen #back-btn")
const switchThemeBtn = document.querySelector(".theme")
const resetHistory = document.querySelector(".reset")
const playerBackBtn = document.querySelector("#player-screen #back-btn")
const playerContinueBtn = document.querySelector("#player-screen #continue-btn")
const gameScreen = document.getElementById("game-screen")
const nameInputs = document.querySelectorAll('input[type="text"]')
const settingsBtnPlayerPage = document.querySelector("#player-screen .settings-btn")
const gamePageBackBtn = document.querySelector("#game-screen .back-btn")
const gamePageSettingsBtn = document.querySelector("#game-screen .settings-btn")
const DisplayName = document.querySelector(".x-score .displayName")
const DisplayNameOther = document.querySelector(".o-score .displayName")
const difficultyBackBtn = document.querySelector("#difficulty-screen #back-btn")
const settingsBtnDifficultyPage = document.querySelector("#difficulty-screen .settings-btn")
const difficultyBtns = document.querySelectorAll("#difficulty-screen button")

difficultyBackBtn.addEventListener(("click"), () => {
    startScreen.classList.toggle("hidden")
    difficultyScreen.classList.toggle("hidden")
})

settingsBtnDifficultyPage.addEventListener(("click"), () => {
    difficultyScreen.classList.toggle("hidden")
    settingsScreen.classList.toggle("hidden")
    gameState.formWhichScreen = [false, false, true, false]
})

difficultyBtns.forEach((Btn) => {
    Btn.addEventListener(("click"), () => {
        gameState.computerDifficulty = Btn.innerText
        difficultyScreen.classList.toggle("hidden")
        gameScreen.classList.toggle("hidden")
        updateDisplayNames()
    })
})
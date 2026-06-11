import { gameState } from "./state.js";

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

gamePageBackBtn.addEventListener(("click"), () => {
    gameScreen.classList.toggle("hidden")
    startScreen.classList.toggle("hidden")
})

gamePageSettingsBtn.addEventListener(("click"), () => {
    gameScreen.classList.toggle("hidden")
    settingsScreen.classList.toggle("hidden")
    gameState.formWhichScreen = [false, false, false, true]
})

// main game logic

let boardMatrix = new Array(9).fill("")
let xTurn = true
let gameOver = false
let xWin = false;
let tie = false;

const cells = document.querySelectorAll("#cell")
const xScoreValue = document.querySelector(".x-score .score-value")
const tieScoreValue = document.querySelector(".tie-score .score-value")
const oScoreValue = document.querySelector(".o-score .score-value")
const gameOverScreen = document.getElementById("game-over-screen")
const resultMessage = document.querySelector(".game-over-screen #result-screen h1")


function checkGameOver(boardMatrix){
    for(let i = 0; i < 9; i += 3){
        if(boardMatrix[i] && (boardMatrix[i] === boardMatrix[i+1]) && (boardMatrix[i] === boardMatrix[i+2])){
            gameOver = true
            xWin = (boardMatrix[i] === "x")
            return
        }
    }
    for(let i = 0; i < 3; i++){
        if(boardMatrix[i] && (boardMatrix[i] === boardMatrix[i+3]) && (boardMatrix[i] === boardMatrix[i+6])){
            gameOver = true
            xWin = (boardMatrix[i] === "x")
            return
        }
    }
    if(boardMatrix[0] && (boardMatrix[0] === boardMatrix[4]) && (boardMatrix[0] === boardMatrix[8])){
        gameOver = true
        xWin = (boardMatrix[0] === "x")
        return
    }
    if(boardMatrix[2] && (boardMatrix[2] === boardMatrix[4]) && (boardMatrix[2] === boardMatrix[6])){
        gameOver = true
        xWin = (boardMatrix[2] === "x")
        return
    }
    if(boardMatrix.indexOf("") === -1){
        gameOver = true
        tie = true
        return
    }
}

function showGameOverScreen(){
    gameOverScreen.classList.toggle("hidden")
}

function displayGameOver(){
    if(tie){
        tie = false
        resultMessage.textContent = "Draw!"
        tieScoreValue.textContent = String(Number(tieScoreValue.textContent) + 1)
    }else{
        if(xWin){
            xWin = false
            resultMessage.textContent = `${DisplayName.textContent} won!`
            xScoreValue.textContent = String(Number(xScoreValue.textContent) + 1)
        }else{
            resultMessage.textContent = `${DisplayNameOther.textContent} won!`
            oScoreValue.textContent = String(Number(oScoreValue.textContent) + 1)
        }
    }
    setTimeout(() => {
        gameOver = false
    }, 1000);
}

function handleTwoPlayerGame(cell, index){
    if(xTurn && boardMatrix[index] === ""){
        cell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`
        boardMatrix[index] = "x"
        xTurn = !xTurn
    }else if(!xTurn && boardMatrix[index] === ""){
        cell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        boardMatrix[index] = "o"
        xTurn = !xTurn
    }
        
    checkGameOver(boardMatrix)
    if(gameOver){
        showGameOverScreen()
        displayGameOver()
    }
}

function easyAI(){
    while(!xTurn && !gameOver){
        const randIdx = Math.floor(Math.random() * 9); 
        if(boardMatrix[randIdx] === ""){
            cells[randIdx].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
            boardMatrix[randIdx] = "o"
            xTurn = !xTurn
        }
    }
    if(gameOver){
        xTurn = !xTurn
    }
}

function toughAI(){
    outerLoop: while(!xTurn && !gameOver){
        for(let i = 0; i < 9; i += 3){
            const row = [boardMatrix[i], boardMatrix[i+1], boardMatrix[i+2]]
            if((row.length !== new Set(row).size) && (row.filter(item => item === "").length === 1)){
                cells[row.indexOf("") + i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
                boardMatrix[row.indexOf("") + i] = "o"
                xTurn = !xTurn                
                break outerLoop
            }
        }
        for(let i = 0; i < 3; i++){
            const column = [[boardMatrix[i], boardMatrix[i+3], boardMatrix[i+6]]]
            if((column.length !== new Set(column).size) && (column.filter(item => item === "").length === 1)){
                cells[column.indexOf("")*3 + i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
                boardMatrix[column.indexOf("")*3 + i] = "o"
                xTurn = !xTurn                
                break outerLoop
            }
        }
        let diag1 = [boardMatrix[0], boardMatrix[4], boardMatrix[8]]
        let diag2 = [boardMatrix[2], boardMatrix[4], boardMatrix[6]]
        if((diag1.length !== new Set(diag1).size) && (diag1.filter(item => item === "").length === 1)){
            cells[diag1.indexOf("")*4].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
            boardMatrix[diag1.indexOf("")*4] = "o"
            xTurn = !xTurn  
            break outerLoop
        }
        if((diag2.length !== new Set(diag2).size) && (diag2.filter(item => item === "").length === 1)){
            cells[diag2.indexOf("")*2 + 2].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
            boardMatrix[diag2.indexOf("")*2 + 2] = "o"
            xTurn = !xTurn
            break outerLoop
        }

        while(!xTurn && !gameOver){
            const randIdx = Math.floor(Math.random() * 9); 
            if(boardMatrix[randIdx] === ""){
                cells[randIdx].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
                boardMatrix[randIdx] = "o"
                xTurn = !xTurn
            }
        }        
    }

    if(gameOver){
        xTurn = !xTurn
    }
}

function unbeatableAI(){
    const board = [...boardMatrix]

    function checkGameStatus(boardMatrix){
        for(let i = 0; i < 9; i += 3){
            if(boardMatrix[i] && (boardMatrix[i] === boardMatrix[i+1]) && (boardMatrix[i] === boardMatrix[i+2])){
                return (boardMatrix[i] === "x") ? "playerwin" : "aiwin"
            }
        }
        for(let i = 0; i < 3; i++){
            if(boardMatrix[i] && (boardMatrix[i] === boardMatrix[i+3]) && (boardMatrix[i] === boardMatrix[i+6])){
                return (boardMatrix[i] === "x") ? "playerwin" : "aiwin" 
            }
        }
        if(boardMatrix[0] && (boardMatrix[0] === boardMatrix[4]) && (boardMatrix[0] === boardMatrix[8])){
            return (boardMatrix[0] === "x") ? "playerwin" : "aiwin"
        }
        if(boardMatrix[2] && (boardMatrix[2] === boardMatrix[4]) && (boardMatrix[2] === boardMatrix[6])){
            return (boardMatrix[2] === "x") ? "playerwin" : "aiwin"
        }
        if(boardMatrix.indexOf("") === -1){
            return "tie"
        }       
    }

    function minmax(board, isMaximising){
        if(checkGameStatus(board) === "tie"){
            return [0, []]
        }
        if(checkGameStatus(board) === "playerwin"){
            return [-10, []]
        }
        if(checkGameStatus(board) === "aiwin"){
            return [+10, []]
        }

        if (isMaximising){
            let bestScore = -Infinity
            let bestPath = []

            board.forEach((cell, index) => {
                if(cell === ""){
                    board[index] = "o"

                    let [score, path] = minmax(board, false)

                    board[index] = ""

                    if (score > bestScore){
                        bestScore = score
                        bestPath = [index, ...path]
                    }
                }
            })
            return [bestScore, bestPath]
        }else{
            let bestScore = Infinity
            let bestPath = []

            board.forEach((cell, index) => {
                if(cell === ""){
                    board[index] = "x"

                    let [score, path] = minmax(board, true)

                    board[index] = ""

                    if (score < bestScore){
                        bestScore = score
                        bestPath = [index, ...path]
                    }
                }
            })
            return [bestScore, bestPath]
        }
    }
    console.log(minmax(board, true))
    let result = minmax(board, true)[1][0]

    if(minmax(board, true)[1].length > 0){
        boardMatrix[result] = "o"
        cells[result].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        xTurn = true
    }
}

function handleAIGame(cell, index){
    //easy ai
    if(gameState.computerDifficulty === "Easy"){
        if(xTurn && boardMatrix[index] === ""){
            cell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`
            boardMatrix[index] = "x"
            xTurn = !xTurn
            checkGameOver(boardMatrix)
            easyAI()
        }
        checkGameOver(boardMatrix)
        if(gameOver){
            showGameOverScreen()
            displayGameOver()
        }
    }

    //tough ai
    if(gameState.computerDifficulty === "Tough"){
        if(xTurn && boardMatrix[index] === ""){
            cell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`
            boardMatrix[index] = "x"
            xTurn = !xTurn
            checkGameOver(boardMatrix)
            toughAI()
        }
        checkGameOver(boardMatrix)
        if(gameOver){
            showGameOverScreen()
            displayGameOver()
        }
    }

    //unbeatable ai
    if(gameState.computerDifficulty === "Unbeatable"){
        xTurn = true
        if(xTurn && boardMatrix[index] === ""){
            cell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`
            boardMatrix[index] = "x"
            xTurn = false
            checkGameOver(boardMatrix)
            unbeatableAI()
        }
        checkGameOver(boardMatrix)
        if(gameOver){
            showGameOverScreen()
            displayGameOver()
        }
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (gameState.chooseAI) {
            handleAIGame(cell, index);
        } else {
            handleTwoPlayerGame(cell, index);
        }
    });
});


function completeReset() {
    boardMatrix = ["", "", "", "", "", "", "", "", ""]  
    xScoreValue.textContent = "0"
    tieScoreValue.textContent = "0"
    oScoreValue.textContent = "0"
    xTurn = true
    cells.forEach(cell => cell.innerHTML=``)
}

function boardReset() {
    boardMatrix = ["", "", "", "", "", "", "", "", ""]  
    cells.forEach(cell => cell.innerHTML=``)
}

gameOverScreen.addEventListener(("click"), () => {
    gameOverScreen.classList.toggle("hidden")
    boardReset()
})

gamePageBackBtn.addEventListener(("click"), () => {
    completeReset()
})
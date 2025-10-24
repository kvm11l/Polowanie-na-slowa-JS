// zmienne
const words = ["jabłko", "banan", "pomarańcza", "gruszka", "truskawka", "arbuz", "cytryna", "malina", "kiwi"];
let targetWord = "";
let score = 0;
let rounds = 0;
const maxRounds = 2;
const winningScore = 2;

// referencji do elementów HTML
const targetWordElement = document.getElementById("target-word");
const randomWordElement = document.getElementById("random-word");
const catchButton = document.getElementById("catch-button");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");

function startRound() {
    targetWord = words[Math.floor(Math.random() * words.length)];       // losuj nowe słowo 
    targetWordElement.textContent = targetWord;                         // aktualizuj wyświetlane słowo 
    rounds++;                                                           // zwiększ licznik rund 
}

function displayRandomWord() {
    randomWordElement.textContent = words[Math.floor(Math.random() * words.length)];        // losowanie słów co 500 ms
}

function updateScore(points) {
    score += points;
    // zabezpieczenie przed ujemnymi punktami
    if (score < 0) {
        score = 0;
    }
    scoreElement.textContent = `Punkty: ${score}`;
}

function handleCatch() {
    if (randomWordElement.textContent === targetWord) {
        updateScore(1);
    } else {
        // odejmij tylko jeśli gracz ma przynajmniej 1 punkt
        if (score > 0) {
            updateScore(-1);
        }
    }
    randomWordElement.textContent = "";
    
    // sprawdź warunki zakończenia gry
    if (score >= winningScore) {
        gameOver(true); // wygrana
    } else if (rounds >= maxRounds) {
        gameOver(false); // koniec rund
    } else {
        startRound();
    }
}

function gameOver(isWin) {
    if (isWin) {
        gameOverElement.textContent = "Wygrałeś!";
        gameOverElement.style.color = "green";
    } else {
        gameOverElement.textContent = "Koniec gry!";
        gameOverElement.style.color = "red";
    }
    gameOverElement.style.display = "block";            // pokazuje komunikat koniec gry
    restartButton.style.display = "block";
    catchButton.disabled = true;                        // blokowanie przycisku
}

function restartGame() {
    score = 0;
    rounds = 0;
    scoreElement.textContent = `Punkty: ${score}`;
    gameOverElement.style.display = "none";
    restartButton.style.display = "none";
    catchButton.disabled = false;
    startRound();
}

startRound();
setInterval(displayRandomWord, 500);                    // wyświetlanie losowego słowa co 500 ms
catchButton.addEventListener("click", handleCatch);     // jesli click to wykonaj
restartButton.addEventListener("click", restartGame);

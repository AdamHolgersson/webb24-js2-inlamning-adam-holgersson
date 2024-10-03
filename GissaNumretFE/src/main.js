import { displayHighscores } from "./modules/gui";
import { getHighScores, addScore } from "./modules/highscorerq";

getHighScores().then(displayHighscores).catch(console.error);

const pResult = document.getElementById("result");
const divMessage = document.getElementById("message");

document.getElementById("btn1").addEventListener("click", () => guess(1));
document.getElementById("btn2").addEventListener("click", () => guess(2));
document.getElementById("btn3").addEventListener("click", () => guess(3));

let score = 0;

function guess(userGuess){
    const randomNum = Math.floor(Math.random() * 3 ) + 1;
    if (userGuess === randomNum) {
        pResult.innerText = "Good job! You guessed right";
        score ++;
        divMessage.innerText = `Your score is now ${score}`;
    } else {
        pResult.innerText = `Wrong! The number was ${randomNum}`;
        divMessage.innerText = `You managed to guess right ${score} times`;
        getHighScores().then(highScores => {
            const lowestScore = highScores.length > 0 ? Math.min(...highScores.map(score => score.score)) : null;
            if (lowestScore === null || score > lowestScore) {
                const userName = prompt("Enter your name");
                if (userName) {
                    addScore(userName, score)
                        .then(response => handleSave(response, userName, score))
                        .then(displayHighscores)
                        .catch(console.error);
                }
            } else {
                divMessage.innerText = `Your score of ${score} is too low to be added to the highscore list`;
                score = 0;
            }
        }).catch(console.error);
    }
}

// Function to make the guess function look less messy
function handleSave(response, userName, score){
    if (response.ok) {
        divMessage.innerText =  `${userName}, your score of ${score} has been saved`;
        score = 0;
        return getHighScores();
    } else {
        console.error("Failed to save");
        divMessage.innerText = "Failed to save, try again";
    }
}
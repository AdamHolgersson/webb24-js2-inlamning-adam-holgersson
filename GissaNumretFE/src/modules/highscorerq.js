const baseURL = "http://localhost:3000/highscores";

async function getHighScores() {
    const res = await fetch(baseURL);
    const scores = await res.json();
    return scores;
}

async function addScore(name , score){
    return fetch(baseURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({name, score})
    })
}

export {getHighScores, addScore};
import fs from "fs/promises";

async function getHighscores(){
    const highScores = await fs.readFile("./src/highscoredb.json");
    return JSON.parse(highScores);
}

async function addScore(newScore){
    let scores = await getHighscores();
    scores.push(newScore);
    scores.sort((a, b)=> b.score - a.score);
    scores = scores.slice(0, 5);
    await fs.writeFile("./src/highscoredb.json", JSON.stringify(scores, null, 2));
}

export { getHighscores, addScore };
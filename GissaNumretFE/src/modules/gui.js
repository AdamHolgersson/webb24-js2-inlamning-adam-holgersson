function displayHighscores(highScores){
    const container = document.querySelector("#highScoresContainer");
    container.innerHTML = "";

    for(const score of highScores){
        const scoreDiv = document.createElement("div");
        const nameEl = document.createElement("h2");
        const scoreEl = document.createElement("p");

        nameEl.innerText = score.name;
        scoreEl.innerText = `${score.score}`;

        scoreDiv.append(nameEl, scoreEl);
        container.append(scoreDiv);
    }
}

export {displayHighscores};
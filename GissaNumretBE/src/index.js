import express from "express";
import cors from "cors"; 
import * as db from "./handledb.js";
import { body, validationResult } from "express-validator";

const PORT = 3000;
const app = express();


const validations = [
    body("name").exists().isString(),
    body("score").exists().isInt({min: 1})
]

app.use(express.json());
app.use(cors());

app.get("/highscores", async (req, res)=>{
    const highscores = await db.getHighscores();
    res.json(highscores);
})

app.post("/highscores", validations, async (req, res)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        res.status(400).json({message: "Invalid format"})
    } else {
        await db.addScore(req.body);
        res.json({message: "New highscore added"})
    }
})

app.listen(PORT, ()=>{ 
    console.log("listening on port ", PORT)
})

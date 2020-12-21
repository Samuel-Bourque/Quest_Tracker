import adventurer from "./domain/adventurer.js";
import express from "express";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  try {
    const payload = await jwt.verify(token, "redemption");
    req.userToken = payload;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
};

app.post("/signup", async (req, res) => {
  const nom = req.body.name;
  const mdp = req.body.password;
  adventurer.createAdventurer(nom, mdp);
  res.sendStatus(200);
});

app.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  try {
    const knownUser = await adventurer.getAdventurerByNameAndPassword(
      name,
      password
    );
    const paydload = {
      id: knownUser._id,
      name: knownUser.name,
    };
    const token = jsonwebtoken.sign(paydload, "redemption");
    res.send(token);
  } catch (e) {
    return res.sendStatus(401);
  }
});

app.get("/quests", authenticate, async (req, res) => {
  try {
    const idAdventurier = req.userToken.id;
    const quests = await adventurer.getAdventurerQuestsById(idAdventurier);
    res.send(quests);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.post("/quests", authenticate, async (req, res) => {
  const nom = req.body.name;
  const lvl = req.body.level;
  try {
    await adventurer.addQuest(req.userToken.id, nom, lvl);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.post("/complete/:questId", authenticate, async (req, res) => {
  try {
    const tokenId = req.userToken.id;
    const questId = req.params.questId;
    await adventurer.completeQuest(tokenId, questId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

console.log("server starting");
app.listen(3000);
console.log("server started");

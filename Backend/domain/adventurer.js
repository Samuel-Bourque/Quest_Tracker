import adventurerDB from "../database/adventurerDB.js";

const createAdventurer = async (name, password) => {
  const newAdventurer = {
    name: name,
    password: password,
    totalXP: 0,
    quest: [],
  };
  await adventurerDB.add(newAdventurer);
};

const getAdventurerByNameAndPassword = async (name, password) => {
  try {
    const adventurer = await adventurerDB.findByName(name);
    if (adventurer.password == password) {
      return adventurer;
    }
  } catch (e) {
    throw new Error("Mauvais nom ou mot de passe");
  }
};

const getAdventurerQuestsById = async (id) => {
  try {
    const adventurier = await adventurerDB.findById(id);
    return adventurier.quest;
  } catch (e) {
    throw e;
  }
};

const addQuest = async (Id, name, level) => {
  const adventurier = await adventurerDB.findById(Id);
  const newQuest = {
    name: name,
    level: level,
    completed: false,
  };
  adventurier.quest.add(newQuest);
};

const completeQuest = async (Id, questId) => {
  try {
    const adventurer = await adventurerDB.findById(Id);
    adventurer.quest[questId].completed = true;
    adventurerDB.updateById(Id, adventurer);
  } catch (e) {
    throw e;
  }
};

export default {
  createAdventurer,
  getAdventurerByNameAndPassword,
  getAdventurerQuestsById,
  addQuest,
  completeQuest,
};

import MongoClient from "mongodb";

const ObjectId = MongoClient.ObjectId;

const url = "mongodb://localhost:27017";
const dbName = "tpfinal";
const collectionName = "adventurers";

let client;

const getCollection = async () => {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return collection;
};
const closeConnection = async () => {
  client.close();
};

const findByName = async (name) => {
  try {
    const collection = await getCollection();
    const collName = await collection.findOne({ name: name });

    if (collName == null) throw new Error("l'aventurier n'a pas été trouvé");
    return collName;
  } catch (e) {
    throw e;
  } finally {
    await closeConnection();
  }
};

const findById = async (id) => {
  try {
    const collection = await getCollection();
    const adventurer = await collection.findOne({
      _id: MongoClient.ObjectId(id),
    });
    return adventurer;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
};

const add = async (adventurer) => {
  try {
    const collection = await getCollection();
    await collection.insertOne(adventurer);
    await closeConnection();
  } catch (e) {
    console.log(e);
  }
};

const updateById = async (id, adventurer) => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const adventurers = db.collection("adventurers");
  try {
    await adventurers.findOneAndDelete({ _id: MongoClient.ObjectId(id) });

    await adventurers.insertOne(adventurer);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
};

export default { findByName, findById, add, updateById };

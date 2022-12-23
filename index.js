const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MongoDB_User_Name}:${process.env.MongoDB_User_password}@cluster0.dp8wnte.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const challenge1DataBase = client.db("Challange1");
    const sectorsCollection = challenge1DataBase.collection("sectors");

    app.get("/sectors", async (req, res) => {
      const result = await sectorsCollection.find({}).toArray();

      res.send(result);
    });
  } finally {
  }
}

run().catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Challenge 1 server running");
});

app.listen(port, () => {
  console.log(`Challenge 1 running on port: ${port}`);
});

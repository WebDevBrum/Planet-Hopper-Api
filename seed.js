const MongoClient = require("mongodb").MongoClient;
const data = require("./data.json");
require("dotenv").config();

// Connection URI for MongoDB Atlas
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.segxlx6.mongodb.net/test`;

async function seedDatabase() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    console.log("Connected to database");
    // console.log(data);

    // Get a reference to the collection
    const collection = client.db("Planets-app").collection("planet-data");
    console.log(collection);

    // Insert the data into the collection
    const result = await collection.insertMany(data);
    console.log("Data seeded successfully:", result);
  } catch (error) {
    console.log("Error seeding data into database:", error);
  } finally {
    // Close the MongoDB client
    client.close();
  }
}

seedDatabase();

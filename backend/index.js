import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 5000;
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "library";
const COLLECTIONS = {novels: "novels"};

// Open Port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB
let db;

async function connectToMongo() {
    const client = new MongoClient(mongoURL);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        db = client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongo();

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// Get all novels available
app.get("/getAllNovels", async (req, res) => {
    try {
        const collection = db.collection(COLLECTIONS.novels);
        const data = await collection.find().toArray();
        res.json({ response: data });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

// Post a novel
app.post("/postNovel", async (req, res) => {
    try {
        // Basic body request check
        let { title, author, rating, note } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required." });
        }
        if (!author) author = "";
        if (!rating) rating = "";
        if (!note) note = "";

        let novel = {title, author, rating, note, dateAdded: new Date()};
        // Send novel to database
        const collection = db.collection(COLLECTIONS.novels );
        const result = await collection.insertOne(novel);
        novel._id = result.insertedId;
        res.json({response: "Novel added succesfully.", novelAdded: novel, insertedId: result.insertedId,});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a note
app.delete("/deleteNovel/:novelId", async (req, res) => {
    try {
        // Basic param checking
        const novelId = req.params.novelId;
        if (!ObjectId.isValid(novelId)) {
            return res.status(400).json({ error: "Invalid novel ID." });
        }

        // Find novel with given ID
        const collection = db.collection(COLLECTIONS.novels);
        const data = await collection.deleteOne({_id: new ObjectId(novelId)});

        if (data.deletedCount === 0) {
            return res.status(404).json({ error: "Unable to find novel with given ID." });
        }
        res.json({ response: `Novel with ID ${novelId} deleted.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

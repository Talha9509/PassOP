const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors=require('cors')

dotenv.config();

console.log("MongoDB URI:", process.env.MONGODB_URI);

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'passop';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
client.connect().then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err);
});

// GET all passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send({ success: false, error: error.message });
    }
});

// POST a password
app.post('/', async (req, res) => {
    try {
        console.log("📥 Incoming POST body:", req.body);

        const password = req.body;

        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const result = await collection.insertOne(password);

        console.log("✅ Inserted:", result.insertedId);
        res.send({ success: true, result });
    } catch (error) {
        console.error("❌ Error in POST /:", error);
        res.status(500).send({ success: false, error: error.message });
    }
});

app.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        const deleteResult = await collection.deleteOne({id});

        if (deleteResult.deletedCount === 1) {
            res.send({ success: true, message: "Password deleted successfully" });
        } else {
            res.status(404).send({ success: false, message: "Password not found" });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: "Error deleting password", error: err });
    }
});


app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});



// dont use this for production, because of hosted on single database,then peoples password will be merged

// 🚨 Problems in Production
// Issue	Why It’s a Problem
// 🆔 No user-based separation	All passwords are saved in one collection — anyone can overwrite or view all entries
// 🔓 No Authentication	Anyone using Postman or curl can read/delete passwords
// 📁 No data encryption	Passwords stored in plaintext — dangerous if leaked
// 🌐 Using only localhost	Won’t work once you deploy unless MongoDB is accessible remotely (e.g., MongoDB Atlas)
// 🧑‍🤝‍🧑 No multi-user support	You can’t track which password belongs to which user
// 🧼 Not sanitized	Inputs should be validated/sanitized to prevent NoSQL injection
// ❌ No schema	MongoDB accepts any structure; better to use Mongoose with schemas in production
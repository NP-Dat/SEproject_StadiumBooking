require("dotenv").config();
const express = require("express");
const fs = require("fs");
const axios = require("axios");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const JSON_FILE = path.join(__dirname, "images.json");

// Function to read and write JSON data
const readJSON = () => {
    try {
        return JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
    } catch (err) {
        return [];
    }
};
const writeJSON = (data) => fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), "utf8");

// Upload to Imgur and save link in JSON
app.post("/upload", upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    try {
        const imgurResponse = await axios.post(
            "https://api.imgur.com/3/image",
            { image: req.file.buffer.toString("base64"), type: "base64" },
            { headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` } }
        );

        const newImage = { id: Date.now(), url: imgurResponse.data.data.link, timestamp: new Date().toISOString() };
        const images = readJSON();
        images.push(newImage);
        writeJSON(images);

        res.json({ message: "Image uploaded!", imageUrl: newImage.url });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error });
    }
});

// Get all uploaded images
app.get("/images", (req, res) => res.json(readJSON()));

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => console.log(`Media service running on port ${PORT}`));

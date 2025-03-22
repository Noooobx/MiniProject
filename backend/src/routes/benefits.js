import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const benefitsRouter = express.Router();

benefitsRouter.get("/schemes", async (req, res) => {
    try {
        const apiKey = process.env.DATA_GOV_API_KEY ;
        const apiUrl = `https://api.data.gov.in/resource/3a29647c-508a-4142-859b-3327f158fa2e?api-key=${apiKey}&format=json`;

        const response = await axios.get(apiUrl);
        if (response.data.records.length === 0) {
            return res.status(404).json({ error: "No farmer schemes found." });
        }

        res.json(response.data.records);
    } catch (error) {
        console.error("Error fetching farmer benefits:", error.message);
        res.status(500).json({ error: "Failed to fetch farmer schemes" });
    }
});

export default benefitsRouter;

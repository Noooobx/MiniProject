import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! This is your demo server!");
});

connectDb()
  .then(() => {
    console.log("Succesfully connected to the database");
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to database failed" + err);
  });

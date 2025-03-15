import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import listingRouter from "./routes/listing.js";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express(); 
app.use(express.json());  
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", listingRouter);

const PORT = process.env.PORT ;

app.get("/", (req, res) => {
  res.send("Hello, World! This is your demo server!");
});

connectDB()
  .then(() => {
    console.log("Succesfully connected to the database");
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to database failed" + err);
  });

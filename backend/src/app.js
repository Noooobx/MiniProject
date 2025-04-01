import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import listingRouter from "./routes/listing.js";
import cookieParser from "cookie-parser";
import newsRouter from "./routes/news.js";
import router from "./routes/auction.js";
import chatRouter from "./routes/chat.js";
import emailRouter from "./routes/email.js";
import cors from "cors";
import otpRouter from "./routes/otpRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import userRouter from "./routes/user.js";
import auctionOrderRouter from "./routes/auctionOrderRouter.js";
import './utils/cron.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-project-psi-navy.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", listingRouter);
app.use("/api/news", newsRouter);
app.use("/api/auctions", router);
app.use("/api/chat", chatRouter);
app.use("/api/email", emailRouter);
app.use("/api", otpRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/success",auctionOrderRouter);



const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Successfully connected to the database");
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to database failed", err);
  });

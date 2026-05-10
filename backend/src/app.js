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
import assistantRouter from "./routes/assistant.js";
import './utils/cron.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const origins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ];

const allowedOriginPatterns = [
  /^https:\/\/.*\.vercel\.app$/,
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (origins.includes(origin)) {
        return callback(null, true);
      }

      if (allowedOriginPatterns.some((pattern) => pattern.test(origin))) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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
app.use("/api/assistant", assistantRouter);



const PORT = process.env.PORT || 3000;

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

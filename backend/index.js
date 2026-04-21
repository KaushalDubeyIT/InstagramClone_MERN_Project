import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

//config
dotenv.config();

// app init
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//cors config
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Coming fron backend",
    success: true,
  });
});

// DB connection + server start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

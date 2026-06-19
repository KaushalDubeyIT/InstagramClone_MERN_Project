import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

// app init
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//cors config
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOptions));

const __dirname = path.resolve();


app.get("/",(req,res)=>{
  res.status(201).json({
    message:"Backend is working properly",
    success:true
  })
})

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("/{*any}",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})

// DB connection + server start
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
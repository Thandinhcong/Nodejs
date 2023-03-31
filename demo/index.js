import express from "express";
import router from "./routers/products"
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routers/auth"
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", authRouter);
mongoose.connect("mongodb://127.0.0.1:27017/DB");

export const viteNodeApp = app;

import express from "express";
import mongoose from "mongoose";
import router from "./router/product";
import routerUser from "./router/user";
import cors from "cors";
import routerCate from "./router/category";
import routerCmt from "./router/comment";
import uploadImageRouter from "./router/uploadImage";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", routerUser);
app.use("/api", routerCate);
app.use("/api", routerCmt);
app.use("/api", uploadImageRouter);
mongoose.connect("mongodb://127.0.0.1:27017/DB");

export const viteNodeApp = app;
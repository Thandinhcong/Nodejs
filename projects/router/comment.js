import express from "express";
import { AddComment, DeleteComment, ListComment, ListOneComment } from "../controller/comment";
const routerCmt = express.Router();
routerCmt.get('/comments', ListComment);
routerCmt.get('/comments/:id', ListOneComment);
routerCmt.delete('/comments/:id', DeleteComment);
routerCmt.post('/comments', AddComment);
export default routerCmt
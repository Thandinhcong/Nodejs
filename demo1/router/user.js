import express from "express";
import { signin, signup } from "../controller/user";
const routerUser = express.Router();

routerUser.post("/signup", signup)
routerUser.post("/signin", signin)

export default routerUser;
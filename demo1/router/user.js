import express from "express";
import { getUser, signin, signup } from "../controller/user";
const routerUser = express.Router();
routerUser.get("/users", getUser);
routerUser.post("/signup", signup)
routerUser.post("/signin", signin)

export default routerUser;
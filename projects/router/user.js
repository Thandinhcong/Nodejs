import express from "express";
import { checkEmail, deleteUser, getOneUser, getUser, signin, signup } from "../controller/user";
const routerUser = express.Router();
routerUser.get("/check-email/:email", checkEmail)
routerUser.get("/users", getUser);
routerUser.get("/users/:id", getOneUser);
routerUser.post("/signup", signup)
routerUser.post("/signin", signin)
routerUser.delete("/users/:id", deleteUser);
export default routerUser;
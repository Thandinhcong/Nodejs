import express from "express";
import { signup, signin } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.get("/signin", signin)
export default router;
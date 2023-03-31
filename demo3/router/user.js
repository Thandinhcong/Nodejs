import express from "express";
import { sigin } from "../controller/user";
const router = express.Router();
router.post("/signin", sigin)

export default router;
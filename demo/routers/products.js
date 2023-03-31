import express from "express";
import { Addproduct, UpdateProduct, get, getAll, remove } from "../controllers/products";


const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", Addproduct);
router.delete("/products/:id", remove);
router.put("/products/:id", UpdateProduct);

export default router;
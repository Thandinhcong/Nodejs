import express from "express";
import { Addproduct, ListOneProduct, ListProduct, UpdateProduct, deleteProduct } from "../controller/product";
import { checkPermission } from "../middlewares/checkpermission";
// import { checkPermission } from "../middlewares/checkpermission";

const router = express.Router();

router.get("/products", ListProduct);
router.get("/products/:id", ListOneProduct);
router.post("/products", checkPermission, Addproduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", UpdateProduct);
export default router;
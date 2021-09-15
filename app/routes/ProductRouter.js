import express from "express";
const router = express.Router();

import { Product } from "../controller";

router.get("/listar", Product.GetAllProduct);
router.get("/categorias", Product.GetCategories);
router.get('/:sku', Product.GetProduct);

export default router;

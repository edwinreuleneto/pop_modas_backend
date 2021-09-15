import express from "express";
const router = express.Router();

import { Product } from "../controller";

router.get('/:sku', Product.GetProduct);
router.get("/listar", Product.GetAllProduct);
router.get("/categorias", Product.GetCategories);

export default router;

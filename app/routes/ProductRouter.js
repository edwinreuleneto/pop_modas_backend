import express from "express";
const router = express.Router();

import { Product } from "../controller";

router.post("/orcar/frete", Product.frete);
router.get("/listar", Product.GetAllProduct);
router.get("/categorias", Product.GetCategories);
router.get('/:sku', Product.GetProduct);
router.post('/cotacao/:cep', Product.getCotacao);

export default router;

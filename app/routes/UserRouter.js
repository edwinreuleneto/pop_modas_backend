import express from "express";
const router = express.Router();

import { User } from "../controller";

router.post("/validar/:email", User.validEmailUser);
router.get("/pedidos/:email", User.getPedidos);

export default router;

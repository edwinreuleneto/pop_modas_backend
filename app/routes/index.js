import express from "express";

const router = express.Router();

//Rotas de Landing
router.use("/status", (req, res) => {
    res.status(200).send({
        status: 'ok'
    })
});
//Fim Rotas de Usuario

//Rotas de Produtos
import ProductRouter from './ProductRouter'
router.use("/produtos", ProductRouter);



//Rotas de Usuario
import UserRouter from './UserRouter'
router.use("/usuario", UserRouter);


module.exports = router;
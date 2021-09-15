import axios from "axios";
import api from '../../services/axios'

export default {
    GetAllProduct: async (req, res) =>{
        try {
            const { pagina } = req.query;
            const produtos = await api.get(`/produtos?somenteValidos=true&camposAdicionais=Estoque&pagina=${pagina}&quantidadeRegistros=5`);

            const getImages = await produtos.data.map(async (item) => {
                let images = await api.get(`/produtos/${item.sku}/imagens?tipoIdentificador=Sku`); 
                Object.assign(item, {images:images.data})
                return produtos.data;
            });

            const resolved = await Promise.all(getImages);

            res.send(resolved[0] || []).status(200);
        } catch (error) {
            console.log('\n\n')
            console.error('CATCH GET GetAllProduct');
            console.error(error);
            console.log('\n\n')
            const e = new Error(error);
            return res.status(500).json({
                error:e.message
            });
        }
    },
    GetProduct: async (req, res) =>{
        try {
            const { sku } = req.params;
            const produto = await api.get(`/produtos/${sku}?tipoIdentificador=Sku`);
            const image = await api.get(`/produtos/${produto.data.sku}/imagens?tipoIdentificador=Sku`); 
            Object.assign(produto.data, {images: image.data})

            res.send(produto.data || []).status(200);
        } catch (error) {
            console.log('\n\n')
            console.error('CATCH GET GetProduct');
            console.error(error);
            console.log('\n\n')
            const e = new Error(error);
            return res.status(500).json({
                error:e.message
            });
        }
    },
    GetCategories: async (req, res) => {
        try{
            const categorias = await api.get('/categorias?somenteFilhos=true');

            res.send(categorias.data || []).status(200);
        } catch (error) {
            console.log('\n\n')
            console.error('CATCH GET getCategorias');
            console.error(error);
            console.log('\n\n')
            const e = new Error(error);
            return res.status(500).json({
                error:e.message
            });
        }
    }
    
}
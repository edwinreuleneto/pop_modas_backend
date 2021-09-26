import api from '../../services/axios'

export default {
    GetAllProduct: async (req, res) =>{
        try {
            const { pagina, categorias } = req.query;

            const produtos = await api.get(`/produtos?pagina=${pagina}&quantidadeRegistros=10&camposAdicionais=Atributo&camposAdicionais=Informacao&camposAdicionais=TabelaPreco&somenteValidos=true${!!categorias ? '&categorias=' + categorias : ''}`);

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
            const produto = await api.get(`/produtos/${sku}?tipoIdentificador=Sku&camposAdicionais=Atributo&camposAdicionais=Informacao&camposAdicionais=TabelaPreco`);
            const image = await api.get(`/produtos/${produto.data.sku}/imagens?tipoIdentificador=Sku`);
            
            const relacionados = await api.get(`/produtos/${produto.data.sku}/relacionados?tipoIdentificador=Sku`);

            const atribuidos = await relacionados.data.map( async (item) => {
                const produto = await api.get(`/produtos/${item.produtoVarianteId}?tipoIdentificador=ProdutoVarianteId&camposAdicionais=Atributo`);
                Object.assign(item, {produto: produto.data});
                return relacionados.data;
            });

            const loadProdutos = await Promise.all(atribuidos);

            // Object.assign(produto.data, { relacionados: loadProdutos});
            Object.assign(produto.data, {images: image.data})
            
            res.send({produto: produto.data, relacionados: loadProdutos} || []).status(200);
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
    },
    frete: async (req, res) => {
        try{
            const { cep } = req.query;

            const frete = await api.post(`/fretes/cotacoes?cep=${cep}&tipoIdentificador=Sku`, req.body);

            res.send(frete.data || []).status(200);
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
    },
    
}
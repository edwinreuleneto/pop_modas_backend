import api from '../../services/axios'

export default {
    validEmailUser: async (req, res) =>{
        try {
            const { email } = req.params;

            const user = await api.get(`/usuarios/email/${email}`);

            res.send(user.data || []).status(200);
        } catch (error) {
            console.log('\n\n')
            console.error('CATCH GET GetAllProduct');
            console.error(error);
            console.log('\n\n')
            const e = new Error(error);
            return res.status(201).json();
        }
    },
    getPedidos: async (req, res) =>{
        try {
            const { email } = req.params;

            const user = await api.get(`/usuarios/${email}/pedidos`);

            res.send(user.data || []).status(200);
        } catch (error) {
            console.log('\n\n')
            console.error('CATCH GET GetAllProduct');
            console.error(error);
            console.log('\n\n')
            const e = new Error(error);
            return res.status(201).json();
        }
    }
}
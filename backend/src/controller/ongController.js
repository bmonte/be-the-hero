const generateUniqueID = require('../utils/generateUniqueID');
// Importa minha conexão com o banco de dados
const connection = require('../database/connection')

module.exports = {
    // CREATE
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        // Gera um id aleatoria para cada ONG
        const id = generateUniqueID();
        // Insiro os dados na tabela ONGs
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
        return response.json({ id });
    },

    // READ
    async index(request, response) {
        // Pega no BD todas as ongs existentes
        const ongs = await connection('ongs').select('*');

        return response.json(ongs)
    }
};
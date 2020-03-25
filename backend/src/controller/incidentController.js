// Importa minha conexão com o banco de dados
const connection = require('../database/connection')

module.exports = {
    // CREATE
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        // Insiro os dados na tabela incidents
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
    
        return response.json({ id });
    },

    // READ
    async index(request, response) {
        const { page = 1 } = request.query;
        // Contador de casos
        const [count] = await connection('incidents').count();
        // Pega no BD todas os incidents existentes
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        //Cabeçalho contendo o total de casos
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    // DELETE
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        //Verifica se a ong que pediu para deleter o incident é a dona dele
        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        //Se não for, um erro é jogado.
        if (incidents.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }
        //Caso esteja tudo certo, é retornado sucesso
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}
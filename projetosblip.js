const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

// Middleware para permitir JSON
app.use(express.json());

// Endpoint para buscar os últimos projetos do GitHub da Takenet e retornar em JSON
app.get('/api/projetos', async (req, res) => {
    try {
        // Chamar a API do GitHub para buscar os repositórios do usuário "takenet"
        const response = await axios.get('https://api.github.com/users/takenet/repos');
        const repos = response.data;

        // Ordenar os repositórios pela data de última atualização (updated_at), mais recentes primeiro
        const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const latestRepos = sortedRepos.slice(0, 5); // Pegando os 5 mais recentemente atualizados

        // Responder com os repositórios em formato JSON
        res.json(latestRepos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar repositórios do GitHub.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});

const express = require('express');
const axios = require('axios');

const app = express();
// O Heroku define a porta na variável de ambiente process.env.PORT
const port = process.env.PORT || 3000;

// Middleware para permitir JSON
app.use(express.json());

// Endpoint para testar se a API está funcionando
app.get('/', (req, res) => {
    res.send('deu bom');
});

// Endpoint para buscar repositórios de um usuário do GitHub
app.get('/repos/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar repositórios' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

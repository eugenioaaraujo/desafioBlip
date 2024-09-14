const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir JSON
app.use(express.json());

// Servir uma página HTML com o chatbot integrado e a tabela dos projetos do GitHub
app.get('/', async (req, res) => {
    try {
        // Chamar a API do GitHub para buscar os repositórios do usuário "takenet"
        const response = await axios.get('https://api.github.com/users/takenet/repos');
        const repos = response.data;

        // Filtrar os 5 principais repositórios
        const topRepos = repos.slice(0, 5);

        // Montar a tabela HTML com os repositórios
        let tableRows = '';
        topRepos.forEach(repo => {
            tableRows += `
                <tr>
                    <td>${repo.name}</td>
                    <td>${repo.language}</td>
                    <td><a href="${repo.html_url}" target="_blank">Ver no GitHub</a></td>
                </tr>
            `;
        });

        res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inno Chatbot</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
                h1 { color: #0096fa; }
                table { width: 80%; margin: 20px auto; border-collapse: collapse; }
                th, td { padding: 10px; border: 1px solid #ddd; }
                th { background-color: #0096fa; color: white; }
            </style>
          <script src="https://unpkg.com/blip-chat-widget" type="text/javascript"></script>

            

            <h2>Principais Projetos da Takenet no GitHub</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Linguagem</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </body>
        </html>
        `);
    } catch (error) {
        res.status(500).send('Erro ao buscar os projetos do GitHub.');
    }
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

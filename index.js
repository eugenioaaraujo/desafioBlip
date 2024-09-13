const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir JSON
app.use(express.json());

// Servir uma página HTML com o chatbot integrado
app.get('/', (req, res) => {
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
        </style>
    </head>
    <body>
        <h1>Bem-vindo ao Inno Chatbot!</h1>
        <p>Clique no ícone para iniciar a conversa com o Inno!</p>
        
        <script>
            window.onload = function () {
                new BlipChat()
                    .withAppKey('aW5ubzooyNWI0YTA5Yy1kOTExlTQ0NjgtYTJhOS1lZDYyY2MxZjE2NTg=')
                    .withButton({"color":"#0096fa","icon":""})
                    .withCustomCommonUrl('https://eugenio-araujo-fqyp7.chat.blip.ai/')
                    .build();
            }
        </script>
    </body>
    </html>
    `);
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

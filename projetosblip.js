const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
const { Configuration, OpenAIApi } = require('openai');

// Configurar a chave da API do OpenAI
const configuration = new Configuration({
    apiKey: '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', 
});
const openai = new OpenAIApi(configuration);

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



// Endpoint para chamar a API do GPT
app.post('/api/gpt', async (req, res) => {
    const { prompt } = req.body; // prompt da requisição (pergunta do usuário)

    try {
        // Faz a chamada para a API do OpenAI com o prompt
        const response = await openai.createChatCompletion({
            messages: "isso é im teste",
            model: 'gpt-3.5-turbo',
          });
        console.log(response);
        // Enviar a resposta de volta para o usuário
        res.json({
            response: response.data.choices[0].text.trim(), // Retorna a resposta do GPT
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});



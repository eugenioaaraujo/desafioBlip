const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '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', 
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.get('/api/projetos', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/users/takenet/repos');
        const repos = response.data;

        const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const latestRepos = sortedRepos.slice(0, 5); 

        res.json(latestRepos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar repositórios do GitHub.' });
    }
});



app.post('/api/gpt', async (req, res) => {
    const { prompt } = req.body; 

    try {
        const response = await openai.createChatCompletion({
            messages:  [{ role: 'user', content: prompt }], 
            model: 'gpt-3.5-turbo',
          });


        res.json({
            response: response.data.choices[0].message.content.trim(),
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});



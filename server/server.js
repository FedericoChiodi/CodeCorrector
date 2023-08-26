import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

// Configurazioni
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Istanza di openaiAPI
const openai = new OpenAIApi(configuration);

// Inizializzazione middleware
const app = express()
app.use(cors())
app.use(express.json())

// Gestione delle richieste GET
app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Response OK'
    })
})

// API call ad OpenAI, modello che completa codice. Prompt prefabbricato
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `//*// Fix and explain bugs in this code:\n${prompt}\n// Fixed code:`,
      temperature: 0.1,
      max_tokens: 1024,
      stop: ["//*//"],
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });
  }
  catch (error) {
    console.error(error)
    res.status(500).send(error || 'Server error');
  }
})

// Esposizione del server sulla porta 5000
app.listen(5000, () => console.log('Server started successfully on port 5000'))

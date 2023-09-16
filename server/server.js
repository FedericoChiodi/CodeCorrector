import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';
/*
* Necessaria per caricare le variabili d'ambiente.
* Caricherà la APIkey di OpenAI salvata in una variabile d'ambiente per
* motivi di sicurezza.
*/
dotenv.config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

/*
* Preparo la configurazione da usare per le API e
* inizializzo Express
*/
const app = express()
app.use(cors())
app.use(express.json())

/*
* Le richieste GET fatte alla radice sono gestite
* con un semplice messaggio di conferma, utile
* per il debug e per verificare che il server sia operativo.
*/
app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Response OK'
    })
})

/*
* Le richieste POST vengono gestite estraendo dal corpo della richiesta
* il prompt dell'utente passato in JSON e inviando una API request ad OpenAI.
* La chiamata alle API è formata da un prompt prefabbricato contenente quello dell'utente 
* e da altri campi necessari ad impostare alcuni parametri del modello.
* La risposta ottenuta dal modello viene poi inviata al client.
*/
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages:[
        {"role": "system", "content": "You are a master programmer with over thirty years of experience."},
        {"role": "user", "content": "The code I am writing contains bugs and does not work properly. Can you fix my code and explain all bugs you correct? Please be concise in your response and only type the fixed code followed by the explanation. Do not use ``` code blocks in your response, type the code as normal text."},
        {"role": "assistant", "content": "Of course, please send me your code so I can help you."},
        {"role": "user", "content": prompt},
      ],
      temperature: 0.05,
      max_tokens: 1024,
    });

    res.status(200).send({
      bot: response.choices[0].message.content
    });
  }
  catch (error) {
    console.error(error)
    res.status(500).send(error || 'Server error');
  }
})

/*
* Il server viene aperto sulla porta 5000
*/
app.listen(5000, () => console.log('Server started successfully on port 5000'))

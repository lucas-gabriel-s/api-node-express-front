const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicione o cors
const weatherRouter = require('./routes/weather');
const currencyRouter = require('./routes/currency');
const calculationsRouter = require('./routes/calculations');

const app = express();
const port = 3000;

app.use(cors()); // Permitir requisições de qualquer origem
app.use(bodyParser.json());

// Rota principal para mostrar uma mensagem de boas-vindas
app.get('/', (req, res) => {
  res.send('Bem-vindo à API aprimorada!');
});

// Rotas das APIs
app.use('/weather', weatherRouter);
app.use('/currency', currencyRouter);
app.use('/calculations', calculationsRouter);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

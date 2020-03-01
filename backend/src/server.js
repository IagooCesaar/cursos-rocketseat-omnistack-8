const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

// Express é uma função que quando chamada cria um novo serviço 
const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@icfn-mpexq.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true    ,
    useUnifiedTopology: true
});

server.use(cors()); // possibilita conexões de qualquer endereço

server.use(express.json()); // indica que todas as requisições e respostas serão em Json

server.use(routes); // Configuração de rotas do serviço

server.listen(3333);//Determina a porta que o serviço estará disponível

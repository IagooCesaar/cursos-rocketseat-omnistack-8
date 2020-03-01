const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

// Express é uma função que quando chamada cria um novo serviço 
const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@icfn-mpexq.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true    ,
    useUnifiedTopology: true
});

server.use(express.json());

server.use(routes);

server.listen(3333);//Determina a porta que o serviço estará disponível

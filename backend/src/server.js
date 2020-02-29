const express = require('express');
// Express é uma função que quando chamada cria um novo serviço 
const server = express();

//
server.get('/', (req, resp) => {
    return resp.json({
        message: `Olá ${req.query.name}`
    });
});

server.listen(3333);//Determina a porta que o serviço estará disponível

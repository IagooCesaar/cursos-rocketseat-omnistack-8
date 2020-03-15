const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');


const routes = require('./routes');

// Express é uma função que quando chamada cria um novo serviço 
const app    = express();
const server = require('http').Server(app);
const io     = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user, app } = socket.handshake.query;

    connectedUsers[user] = socket.id;
    console.log('Novo vinculo socket de usuário', user, socket.id, 'no app ', app);
});

mongoose.connect('mongodb+srv://omnistack:omnistack@icfn-mpexq.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true    ,
    useUnifiedTopology: true
});

// Middleware
app.use((req, resp, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors()); // possibilita conexões de qualquer endereço

app.use(express.json()); // indica que todas as requisições e respostas serão em Json

app.use(routes); // Configuração de rotas do serviço

server.listen(3333);//Determina a porta que o serviço estará disponível

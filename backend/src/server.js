const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');


const routes = require('./routes');

// Express é uma função que quando chamada cria um novo serviço 
const app = express();
const server = require('http').Server(app);
const io     = require('socket.io')(server);

io.on('connection', socket => {
    console.log('Nova conexão',socket.id)
    socket.on('hello', message => {
        console.log('Mensagem recebida do frontend:',message)
    });
    
    setTimeout(() => {
        socket.emit('world', {
            message: 'OmniStack'
        });
    }, 5000);
});

mongoose.connect('mongodb+srv://omnistack:omnistack@icfn-mpexq.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true    ,
    useUnifiedTopology: true
});

app.use(cors()); // possibilita conexões de qualquer endereço

app.use(express.json()); // indica que todas as requisições e respostas serão em Json

app.use(routes); // Configuração de rotas do serviço

server.listen(3333);//Determina a porta que o serviço estará disponível

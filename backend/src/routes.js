const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/', (req, resp) => {
    return resp.json({
        message: `Olá ${req.query.name}`
    });
});

routes.get('/devs', DevController.index);                       //função para retornar todos os devs
routes.post('/devs', DevController.store);                      //função para cadastrar novos devs
routes.post('/devs/:devId/likes', LikeController.store);        //função para realizar like
routes.post('/devs/:devId/dislikes', DislikeController.store);  //função para realizar dislike

module.exports = routes;
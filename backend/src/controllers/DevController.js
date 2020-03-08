const axios = require('axios');
const Dev = require('../models/Dev');


module.exports = {
    async index(req, resp) {
        const { user } = req.headers;
        console.log('Retornando devs para o usuário '+user);
        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and:  [
                { _id: {$ne: user} },
                { _id: {$nin: loggedDev.likes} },
                { _id: {$nin: loggedDev.dislikes} },
            ],
        })

        return resp.json(users);
    },

    async store(req, resp) {
        
        const { username } = req.body;
        console.log('Cadsatrando e retornando dados do dev: '+username);

        const userExists = await Dev.findOne({
            user: username
        });
        if (userExists) {
            return resp.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        resp.json(dev);
    } 

};
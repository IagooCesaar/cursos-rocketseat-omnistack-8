const axios = require('axios');
const Dev = require('../models/Dev');


module.exports = {
    async store(req, resp) {
        const { username } = req.body;

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
const Dev = require('../models/Dev');

module.exports = {
    async store(req, resp) {
        //console.log(req.io, req.connectedUsers);
        
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);
        console.log('Like registrado de '+loggedDev.name+' em '+targetDev.name);

        if (!targetDev) {
            return resp.status(400).json({
                erro: "Dev not exists"
            });
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('Match entre devs: '+loggedDev.name+' e '+targetDev.name);
            const loggedSocket = req.connectedUsers[loggedDev._id];
            const targetSocket = req.connectedUsers[targetDev._id];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev)
            }
            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev)
            }

        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return resp.json(loggedDev);
    }
}
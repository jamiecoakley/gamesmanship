const jwt = require('jsonwebtoken');
const Gamer = require('../db').import('../models/gamers');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('YOUR TOKEN IS ', token);
    if (!token) {
        return res.status(403).send({auth: false, message: 'NO TOKEN PROVIDED!'})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken = ', decodeToken);
            if (!err && decodeToken) {
                Gamer.findOne({where: {id: decodeToken.id}})
                .then(gamer => {
                    console.log('GAMER = ', gamer);
                    if(!gamer) throw err;
                    console.log('req = ', req);
                    req.gamer = gamer;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('GAME OVER. TRY AGAIN.')
            }
        })
    }
}

module.exports = validateSession
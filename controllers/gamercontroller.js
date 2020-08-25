const express = require('express');
const router = express.Router();
const Gamer = require('../db').import('../models/gamers.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//GAMER SIGN-UP - functioning correctly
router.post('/create', (req, res) => {
    let gamerModel = {
        gamername: req.body.gamer.gamername,
        password: bcrypt.hashSync(req.body.gamer.password, 14),
    };
    
    Gamer.create(gamerModel).then(gamer => {
        let token = jwt.sign({id: gamer.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            gamer: gamer.gamername,
            message: 'GAMER SUCCESSFULLY INITIALIZED',
            sessionToken: token
        });
    })
    .catch(err => {
        res.status(500).json({error: err, message: "NO INITIALIZATION TOOK PLACE"});
    });
});

//GAMER LOG-IN - getting error status 502
router.post('/login', (req, res) => {
    let gamername = req.body.gamer.gamername
    Gamer.findOne({
        where: {gamername: gamername}
    })
    .then(function gameOn(gamer) {
        if(gamer) {
            bcrypt.compare(req.body.gamer.password, gamer.password, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({id: gamer.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24,})

                    res.status(200).json({
                        message: "WELCOME TO YOUR GAME LOG",
                        gamername: gamername,
                        sessionToken: token
                    })
                } else {
                    res.status(502).json({error: err, message: "WOMP WOMP... TRY AGAIN."})
                }
            });
        } else {
            res.status(500).json({error: "LEARN YOUR NAME. I BELIEVE IN YOU."})
        }
    })
    .catch(err => {
        res.status(500).json({error: err, message: "SOMETHING HAPPENED. GOOD LUCK WITH THAT."})
    })
})

module.exports = router;
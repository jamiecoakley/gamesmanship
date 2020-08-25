const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
const GameLog = sequelize.import('../models/gamelog');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

//CREATE GAMELOG ENTRY - functioning correctly
router.post('/create', validateSession, (req, res) => {
    const gameLogEntry = {
        title: req.body.game.title,
        hours: req.body.game.hours,
        date: req.body.game.date,
        score: req.body.game.score,
        platform: req.body.game.platform,
        review: req.body.game.review,
        media: req.body.game.media,
        owner: req.gamer.id
    }
    GameLog.create(gameLogEntry)
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json({error: err}))
})

//EDIT OR UPDATE GAMELOG ENTRY - functioning correctly
router.put('/edit/:id', validateSession, (req, res) => {
    const updateGame = {
        title: req.body.game.title,
        hours: req.body.game.hours,
        date: req.body.game.date,
        score: req.body.game.score,
        platform: req.body.game.platform,
        review: req.body.game.review,
        media: req.body.game.media
    };

    const query = {where: {id: req.params.id, owner: req.gamer.id}};

    GameLog.update(updateGame, query)
    .then((games) => res.status(200).json(games))
    .catch((err) => res.status(500).json({error: err, message: "OOPSIE POOPSIE"}))
});

//DELETE ENTRY - communication error
router.delete('/delete/:id', validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner: req.gamer.id}};

    GameLog.destroy(query)
    .then((deleteStatus) => {
        let message = deleteStatus != [0] ? "GAME ENTRY ANNIHILATED" : "DELETE DENIED"
        res.status(200).json({message: message})})
    .catch((err) => res.status(500).json({error: err, message: "DELETE DENIED"}))
})

//giving a status 200 when user tries to delete another user's entry, but the entry isn't actually deleted.

//GET ALL GAMELOG ENTRIES FOR USER - functioning correctly
router.get("/view", validateSession, (req, res) => {
    GameLog.findAll({
        where: {owner: req.gamer.id}
    })
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json({error: err, message: "UH OH. IT BROKE."}))
});

//GET GAMELOG ENTRIES BY TITLE - functioning correctly
router.get('/:title', validateSession, (req, res) => {
    GameLog.findAll({
        where: {title: req.params.title}
    })
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json({error: err, message: "NOPE. DENIED."}))
});

//GET ALL GAMELOG ENTRIES - only getting '[]'
router.get('/viewall', (req, res) => {
    GameLog.findAll()
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json({error: err, message: "NOT HAPPENIN'!"}))
});

module.exports = router;
require('dotenv').config();
const express = require('express');
const app = express();
const create = require('./controllers/gamercontroller');
const login = require('./controllers/gamercontroller');
const game = require('./controllers/gamelogcontroller');
let sequelize = require('./db');

sequelize.sync();

app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/gamer', create);

app.use('/gamer', login);

app.use('/entry', game);

app.listen(process.env.PORT, () => {
    console.log('Gamesmanship is broadcasting on 3000.')
});
const regionsTC = require('../../data/regionsTC');

const readAll = (req, res) => {
    res.json(regionsTC).end();
}

module.exports = { readAll }
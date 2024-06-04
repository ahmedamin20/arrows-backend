const positions = require('../../data/contact-us/positions');

const readAll = (req, res, next) => {
    res.json(positions).end();
}

module.exports = { readAll }
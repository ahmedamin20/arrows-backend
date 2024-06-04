const countries = require('../../data/contact-us/countries');

const readAll = (req, res) => {
    res.json(countries).end();
}

module.exports = { readAll }
const categories = require('../../data/contact-us/categories');

const readAll = (req, res, next) => {
    res.json(categories).end();
}

module.exports = { readAll }
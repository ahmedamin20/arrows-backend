const pages = require('../pages');
const page = require('../models/page');
const mongoose = require('mongoose');
const p = mongoose.Promise = require('bluebird');


const addPages = p.all(pages.map(i => new page(i).save()))
    .then(() => console.log('Data saved'))
    .catch((err) => console.log('Error: ' + err))
    .finally(process.exit);

module.exports = addPages;
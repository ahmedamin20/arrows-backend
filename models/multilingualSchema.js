const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const multilingualStringSchema = new Schema({
    en: { type: String, default:null },
    ar: { type: String,default:null }
}, { _id: false });

module.exports = multilingualStringSchema;

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const testimonialsSchema = new mongoose.Schema({
    customerName: { type: multilingualStringSchema, required: true},
    review: { type: multilingualStringSchema, required: true },
    rating : {type: Number, required:true},
    company :{type:multilingualStringSchema,required:true},
    title :{type:multilingualStringSchema,required:true}

});

testimonialsSchema.plugin(mongoosePaginate);
testimonialsSchema.index({ customerName: 'text' });

module.exports = mongoose.model('Testimonials', testimonialsSchema);

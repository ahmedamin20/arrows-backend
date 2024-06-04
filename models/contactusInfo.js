const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const multilingualStringSchema = require('./multilingualSchema');

const contactusInfoSchema = mongoose.Schema({
    title: { type: multilingualStringSchema, required: true },
    description: { type: multilingualStringSchema, required: true },
    formTitle: { type: multilingualStringSchema, required: true },
    location: { type: multilingualStringSchema, required: true },

});
contactusInfoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ContactUsInfo', contactusInfoSchema);
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const multilingualStringSchema = require('./multilingualSchema');

const letsTalkSchema = mongoose.Schema({
    subTitle: { type: multilingualStringSchema, required: true },
    title: { type: multilingualStringSchema, required: true },
    shortText: { type: multilingualStringSchema, required: true },
    buttonText:{type:multilingualStringSchema,required:true}

});
letsTalkSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('LetsTalk', letsTalkSchema);
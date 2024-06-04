const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const multilingualStringSchema = require('./multilingualSchema');

const faqSchema = mongoose.Schema({
    question: { type: multilingualStringSchema, required: true, unique: true },
    answer: { type: multilingualStringSchema, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubServices' }

});
faqSchema.plugin(mongoosePaginate);
faqSchema.index({ question: "text", answer: "text" });

module.exports = mongoose.model('faqs', faqSchema);
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const multilingualStringSchema = require('./multilingualSchema');

const footerSchema = mongoose.Schema({
    description:{type:multilingualStringSchema, required:true},
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address:{type:String, required:true},
    facebookLink: { type: String, required: true },
    instagramLink: { type: String, required: true },
    whatsAppLink: { type: String, required: true },
    linkedInLink:{type:String,required:true},
    vimoLink: { type: String, required: true },

});
footerSchema.plugin(mongoosePaginate);
footerSchema.index({ question: "text", answer: "text" });

module.exports = mongoose.model('Footer', footerSchema);
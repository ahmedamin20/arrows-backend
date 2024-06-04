const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const requestContact = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status : {type: String,default:'New'},
    comment : {type:String ,default :""}
}, { timestamps: true });

requestContact.plugin(mongoosePaginate);
requestContact.index({ '$**': 'text' });


requestContact.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('ContactUsRequests', requestContact);
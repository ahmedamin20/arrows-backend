const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const howItWorksSchema = new mongoose.Schema({
    title :{type:multilingualStringSchema,required:true,unique:true},
    description:{type:multilingualStringSchema,required:true},
    imageUrl: { type: String,required:true},
    color:{type:String,required:true},
});

howItWorksSchema.plugin(mongoosePaginate);
howItWorksSchema.index({ title: 'text'});

howItWorksSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('HowItWorks', howItWorksSchema);
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const servicesSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    imageDescriptionUrl: { type: String, required: true },
    isVideo:{type:Boolean,default:false},
    title:{type:multilingualStringSchema,required:true},
    subTitle:{type:multilingualStringSchema,required:true},
    description:{type:multilingualStringSchema,required:true},
    color:{type:String,required:true},
    subServiceIds:[{ type: mongoose.Schema.Types.ObjectId, ref: 'SubServices' }],
});

servicesSchema.plugin(mongoosePaginate);
servicesSchema.index({ title: 'text' });

servicesSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
        if (oldData?.imageDescriptionUrl && oldData.imageDescriptionUrl != newData.imageDescriptionUrl) {
            deleteFile(oldData.imageDescriptionUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('Services', servicesSchema);
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const subServicesSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    imageDescriptionUrl: { type: String, required: true },
    isVideo: { type: Boolean, default: false },
    title: { type: multilingualStringSchema, required: true },
    description: { type: multilingualStringSchema, require: true },
    shortDescription:{type:multilingualStringSchema,require:true},
    howItWorksIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HowItWorks', required: true }]
});


subServicesSchema.plugin(mongoosePaginate);
subServicesSchema.index({ title: 'text' });

subServicesSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('SubServices', subServicesSchema);
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');

const partnerSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true },});

partnerSchema.plugin(mongoosePaginate);
partnerSchema.index({ title: 'text', subTitle: 'text' });

partnerSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('Partners', partnerSchema);
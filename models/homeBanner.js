const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const multilingualStringSchema = require('./multilingualSchema');
const deleteFile = require('../utils/file');

const homeBannerSchema = new mongoose.Schema({
    imageUrl: { type: String},
    isVideo: { type: Boolean, default: false },
    title: { type: multilingualStringSchema },
    subTitle: { type: multilingualStringSchema ,default:null },
});

homeBannerSchema.plugin(mongoosePaginate);
homeBannerSchema.index({ title: 'text', subTitle: 'text' });

homeBannerSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('HomeBanner', homeBannerSchema);
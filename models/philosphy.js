const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');


const philosphySchema = mongoose.Schema({
    imagesUrl: [{ type: String, required: true }],
    header: { type: multilingualStringSchema, required: true },
    description: { type: multilingualStringSchema, required: true },

});

philosphySchema.plugin(mongoosePaginate);
philosphySchema.index({ description: "text"});

philosphySchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('Philosphy', philosphySchema);
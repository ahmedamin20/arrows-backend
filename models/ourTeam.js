const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const ourTeamSchema = new mongoose.Schema({
    imageUrl: { type: String},
    title: { type: multilingualStringSchema, required: true },
    name: { type: multilingualStringSchema, required: true },
});

ourTeamSchema.plugin(mongoosePaginate);
ourTeamSchema.index({ name: 'text' });

ourTeamSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('OurTeam', ourTeamSchema);
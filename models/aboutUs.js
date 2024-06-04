const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const aboutUsSchema = new mongoose.Schema({
    imageUrl: { type: String},
    videoUrl:{type:String},
    whoWeAre: { type: multilingualStringSchema, required: true},
    aboutUs: { type: multilingualStringSchema ,required:true},
    ourGoal: { type: multilingualStringSchema ,require:true},
    ourValues: { type: multilingualStringSchema ,required:true},
    title:{type:multilingualStringSchema,required:true}
});

aboutUsSchema.plugin(mongoosePaginate);


aboutUsSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
        if (oldData?.videoUrl && oldData.videoUrl != newData.videoUrl) {
            deleteFile(oldData.videoUrl);
        }
    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('AboutUs', aboutUsSchema);
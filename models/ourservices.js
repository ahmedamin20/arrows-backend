const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');


const ourServicesSchema = new mongoose.Schema({
    name: { type: multilingualStringSchema, required: true, unique: true },
    imageUrl: { type: String, required: true },
    titleColor : {type: String, required:true},
    description : {type:multilingualStringSchema , required:true},
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Services', unique: true, required: true},
    order:{type:Number,required:true}
});

ourServicesSchema.plugin(mongoosePaginate);
ourServicesSchema.index({ name: 'text' });

ourServicesSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});


module.exports = mongoose.model('OurService', ourServicesSchema);

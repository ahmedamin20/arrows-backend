const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const blogsSchema = new mongoose.Schema({
    title: { type: multilingualStringSchema, required: true, unique: true },
    imageUrl: { type: String, required: true },
    isVideo:{type:String,default:false},
    description : {type:multilingualStringSchema , required:true},
    shortDescription : {type:multilingualStringSchema , required:true},
    createdDate : {type:Date,required:true},
    isHighlighted: { type: Boolean, default: false },
    owner:{type:multilingualStringSchema,required:true},
    type:{type:String,required:true},
    titleColor :{type:String , required:true}
});

blogsSchema.plugin(mongoosePaginate);
blogsSchema.index({ title: 'text' });

blogsSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
    } catch (err) { console.log(err); next(err) }
});


module.exports = mongoose.model('Blogs', blogsSchema);

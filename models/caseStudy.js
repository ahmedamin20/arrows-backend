const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');

const caseStudySchema = new mongoose.Schema({
    imageHomePageCoverUrl: { type: String,required:true},
    imageCoverUrl: { type: String,required:true},
    imageUrl: { type: String,required:true},
    companyLogoUrl : {type: String,required:true},
    highlighted: { type: Boolean, default: false },
    isBannerVideo:{type:Boolean,default:false},
    brandBrief:{type:multilingualStringSchema,required:true},
    location:{type:multilingualStringSchema,required:true},
    date:{type:Date,required:true},
    title: { type: multilingualStringSchema, required: true, unique: true },
    client : {type:multilingualStringSchema,required:true},
    category :{type:multilingualStringSchema , required:true},
    services:[{  type: mongoose.Schema.Types.ObjectId, ref: 'Services' }],
    subServices:[{  type: mongoose.Schema.Types.ObjectId, ref: 'SubServices' }],
    projects:[{  type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

caseStudySchema.plugin(mongoosePaginate);
caseStudySchema.index({ title: 'text', subTitle: 'text' });

caseStudySchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
        if (oldData?.imageUrl && oldData.imageUrl != newData.imageUrl) {
            deleteFile(oldData.imageUrl);
        }
        if (oldData?.imageHomePageCoverUrl && oldData.imageHomePageCoverUrl != newData.imageHomePageCoverUrl) {
            deleteFile(oldData.imageHomePageCoverUrl);
        }
        if (oldData?.companyLogoUrl && oldData.companyLogoUrl != newData.companyLogoUrl) {
            deleteFile(oldData.companyLogoUrl);
        }
        if (oldData?.imageCoverUrl && oldData.imageCoverUrl != newData.imageCoverUrl) {
            deleteFile(oldData.imageCoverUrl);
        }

    } catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
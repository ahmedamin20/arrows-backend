const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const deleteFile = require('../utils/file');
const multilingualStringSchema = require('./multilingualSchema');
const _ = require('lodash');

const projectSchema = new mongoose.Schema({
    header: { type: multilingualStringSchema, required: true },
    title: { type: multilingualStringSchema, required: true },
    imageUrl: [{ type: String, required: true }],
    brief: { type: multilingualStringSchema, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }],
    subServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubServices' }],
    isVideo: { type: Boolean, required: true },
    iconUrl: { type: String, required: true },
    caseStudyName: { type: multilingualStringSchema }
});

projectSchema.plugin(mongoosePaginate);
projectSchema.index({ title: 'text', subTitle: 'text' });

projectSchema.pre('updateOne', async function (next) {
    try {
        const query = this.getQuery();
        const oldData = await this.model.findOne(query).lean();
        const newData = this.getUpdate();

        if (oldData && oldData.imageUrl && Array.isArray(oldData.imageUrl)) {
            const oldImageUrls = new Set(oldData.imageUrl);
            const newImageUrls = new Set(newData.imageUrl || []);

            // Find URLs that are in oldImageUrls but not in newImageUrls
            const urlsToRemove = [...oldImageUrls].filter(url => !newImageUrls.has(url));

            urlsToRemove.forEach(url => {
                deleteFile(url); // Implement your deleteFile function to handle the file deletion
            });
        }
        next();
    }  catch (err) { console.log(err); next(err) }
});

module.exports = mongoose.model('Project', projectSchema);

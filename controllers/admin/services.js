const Servcies = require('../../models/servcies');
const fireError = require('../../utils/error');
const MAX_DOCUMENTS_COUNT = 1000;
const escapeRegex = require('escape-regexp');

const create = (req, res, next) => {
    console.log("hereee",req.files)
    let query = {};
    if(req.files) {
        req.files.image ? query['imageUrl'] = req.files.image[0].path : 0;
        req.files.imageDesc ? query['imageDescriptionUrl'] = req.files.imageDesc[0].path : 0;
    }
    const data = JSON.parse(req.body.data)
    Servcies.create({ ...data, ...query })
        .then(result => res.status(202).end()).catch(err => (err.code === 11000) ?
            next(fireError(err, 'Failed, Service title already exists.', 409)) :
            next(fireError(err, 'Failed to create new service.', 500)));
}
const readAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || MAX_DOCUMENTS_COUNT;
        const offset = limit * (page - 1);
        const filter = req.query.filter;
        
        // Define options for pagination
        const options = {
            offset: offset,
            limit: limit,
            sort: 'title.en',
            populate: { path: 'subServiceIds', select: 'title description shortDescription isVideo' }

        };

        // Define the filter condition
        const query = filter ? { 'title.en': { $regex: filter, $options: 'i' } } : {};

        // Perform pagination with filter
        const result = await Servcies.paginate(query, options);

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};


const readOne = (req, res, next) => Servcies.findById(req.params.id).populate('subServiceIds', 'title description shortDescription isVideo')
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

    
const update = (req, res, next) => {
    let query = {};
    console.log("hereee",req)
    if(req.files) {
        req.files.image ? query['imageUrl'] = req.files.image[0].path : 0;
        req.files.imageDesc ? query['imageDescriptionUrl'] = req.files.imageDesc[0].path : 0;
    }
    const data = JSON.parse(req.body.data)
    Servcies.updateOne({ _id: req.params.id },{ ...data, ...query })
        .then(result => res.status(204).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));
}

const remove = async (req, res, next) => {
    try {
        const doc = await Servcies.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}

module.exports = { create, readAll, readOne, update, remove };
const OurServices = require('../../models/ourservices');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    const data = JSON.parse(req.body.data)
    OurServices.create({ ...data, ...(req.file ? { imageUrl: req.file.path } : {}) })
        .then(result => res.status(202).end()).catch(err => (err.code === 11000) ?
            next(fireError(err, 'Failed, item title already exists.', 409)) :
            next(fireError(err, 'Failed to create new item.', 500)));
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
            sort: 'name.en',
        };

        // Define the filter condition
        const query = filter ? { 'name.en': { $regex: filter, $options: 'i' } } : {};

        // Perform pagination with filter
        const result = await OurServices.paginate(query, options);

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};

const readOne = (req, res, next) => OurServices.findById(req.params.id).populate('serviceId','_id title')
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

    
const update = (req, res, next) => {
    const data = JSON.parse(req.body.data)
    OurServices.updateOne({ _id: req.params.id }, { ...data, ...(req.file ? { imageUrl: req.file.path } : {}) })
        .then(result => res.status(204).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));
}

const remove = async (req, res, next) => {
    try {
        const doc = await OurServices.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}

module.exports = { create, readAll, readOne, update, remove };
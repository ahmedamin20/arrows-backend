const Testimonials = require('../../models/testimonials');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    Testimonials.create(req.body).then(result => res.status(202).end())
        .catch(err => (err.code === 11000) ? next(fireError(err, 'Failed, this question already exists.', 409)) :
            next(fireError(err, 'Failed to create new question.', 500)));
}

const readAll = async (req, res, next) => {
    try {
        console.log(req.query.filter);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || MAX_DOCUMENTS_COUNT;
        const offset = limit * (page - 1);
        const filter = req.query.filter;
        
        // Define options for pagination
        const options = {
            offset: offset,
            limit: limit,
            sort: 'customerName',
        };

        // Define the filter condition
        const query = filter ? { 'customerName.en': { $regex: filter, $options: 'i' } } : {};

        // Perform pagination with filter
        const result = await Testimonials.paginate(query, options);

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};

const readOne = (req, res, next) => Testimonials.findById(req.params.id)
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

const update = (req, res, next) =>
Testimonials.updateOne({ _id: req.params.id }, req.body).then(result => res.status(204).end())
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));

const remove = async (req, res, next) => {
    try {
        const doc = await Testimonials.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}

module.exports = { create, readAll, readOne, update, remove };
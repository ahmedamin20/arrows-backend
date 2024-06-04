const Footer = require('../../models/footer');
const fireError = require('../../utils/error');
const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    Footer.create(req.body).then(result => res.status(202).end())
        .catch(err => (err.code === 11000) ? next(fireError(err, 'Failed, this question already exists.', 409)) :
            next(fireError(err, 'Failed to create new question.', 500)));
}

const readAll = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
    };
    Footer.paginate(filter ? ({ $text: { $search: `"${filter}"` } }) : {}, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to read.', 500)));
}

const readOne = (req, res, next) => Footer.findById(req.params.id)
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

const update = (req, res, next) =>
Footer.updateOne({ _id: req.params.id }, req.body).then(result => res.status(204).end())
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));


const remove = async (req, res, next) =>
Footer.deleteOne({ _id: req.params.id }).then(result => res.status(204).end())
        .catch(err => next(fireError(err, 'Failed to delete.', 500)));

module.exports = { create, readAll, readOne, update, remove };
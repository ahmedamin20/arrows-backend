const SubServices = require('../../models/subServices');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const readAll = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
        sort: 'title',
        populate: { path: 'howItWorksIds', select: '_id title description imageUrl color' }
    };
    SubServices.paginate(filter ? ({ $text: { $search: `"${filter}"` } }) : {}, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));
}

const readOne = async (req, res) => SubServices.findById(req.params.id).populate('howItWorksIds', 'title description imageUrl color')
    .then(SubServices => SubServices ? res.json(SubServices) : res.status(404).end())
    .catch(error => res.status(500).end());

module.exports = { readAll ,readOne };   
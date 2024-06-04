const HeaderItem = require('../../models/headerItems');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    console.log(req.body);
    const { label, isHovered, order,subItems } = req.body;
    HeaderItem.create({ label, isHovered, order,subItems })
        .then(result => res.status(201).json(result))
        .catch(err => next(fireError(err, 'Failed to create new header item.', 500)));
};

const readAll = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
        sort: { order: 1 }, // Sort by the 'order' field in ascending order
    };
    HeaderItem.paginate(filter ? ({ $text: { $search: `"${filter}"` } }) : {}, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to fetch header items.', 500)));
}



const readOne = async (req, res, next) => {
    try {
        const headerItem = await HeaderItem.findById(req.params.id);
        if (!headerItem) {
            return res.status(404).json({ message: 'Header item not found.' });
        }
        res.status(200).json(headerItem);
    } catch (err) {
        next(fireError(err, 'Failed to fetch header item.', 500));
    }
};

const update = async (req, res, next) => {
    try {
        const { label, isHovered, order,subItems } = req.body;
        const updatedHeaderItem = await HeaderItem.findByIdAndUpdate(req.params.id, { label, isHovered,order, subItems }, { new: true });
        res.status(200).json(updatedHeaderItem);
    } catch (err) {
        next(fireError(err, 'Failed to update header item.', 500));
    }
};

const remove = async (req, res, next) => {
    try {
        const deletedHeaderItem = await HeaderItem.findByIdAndDelete(req.params.id);
        if (!deletedHeaderItem) {
            return res.status(404).json({ message: 'Header item not found.' });
        }
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete header item.', 500));
    }
};

module.exports = { create, readAll, readOne, update, remove };

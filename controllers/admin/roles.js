const Role = require('../../models/role');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    const data = req.body
    Role.create(data).then(result => res.status(202).end()).catch(err => (err.code === 11000) ?
            next(fireError(err, 'Failed, Name already exists.', 409)) :
            next(fireError(err, 'Failed to create new role.', 500)));
}

const readAllAdmin = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const query = {
        ...filter ? ({ $text: { $search: `"${filter}"` } }) : {},
    }
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
        sort: 'title',
        populate: { path: 'pageIds', select: 'name path icon class' }
    };
    Role.paginate(query, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));
}

const readAll = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const query = {
        ...filter ? ({ $text: { $search: `"${filter}"` } }) : {},
        title: { $ne: 'Super Admin' }
    }
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
        sort: 'title',
        populate: { path: 'pageIds', select: 'name path icon class' }
    };
    Role.paginate(query, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));
}


const readOne = (req, res, next) => Role.findById(req.params.id).populate('pageIds', 'name icon class path')
    .then(role => role ? res.json(role) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

const update = (req, res, next) => {
    Role.updateOne({ _id: req.params.id }, req.body).then((result) => res.status(200).end()).catch(err => (err.code === 11000) ?
        next(fireError(err, 'Failed, Name already exists.', 409)) :
        next(fireError(err, 'Failed to update role.', 500)));
}

const remove = async (req, res, next) => {
    try {
        const doc = await Role.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}



module.exports = { create, readAll, readOne, update, remove, readAllAdmin };
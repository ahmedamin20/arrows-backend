const user = require('../../models/user');
const User = require('../../models/user');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const createUser = (req, res, next) => {
    User.create(req.body).then((result) => res.status(200).end()).catch(err => (err.code === 11000) ?
        next(fireError(err, 'Failed, Either Email is registered before.', 409)) :
        next(fireError(err, 'Failed to create new user.', 500)));
}
const readAll = async (req, res, next) => {
    console.log(req.query.filter); // Log the filter value to check if it's received correctly
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const query = {
        username: { $ne: 'admin' }
    };
    if (filter) {
        query.$text = { $search: `"${filter}"` };
    }
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
        sort: 'username',
        populate: { path: 'roleIds', select: 'title', populate: [{ path: 'pageIds', select: 'name path icon class' }] }
    };
    User.paginate(query, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to read.', 500)));
};


const readOne = (req, res, next) => User.findById(req.params.id).populate({ path: 'roleIds', select: 'title ', populate: [{ path: 'pageIds', select: 'name path icon class' }] })
    .then(user => user ? res.json(user) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

const update = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then((result) => res.status(200).end()).catch(err => (err.code === 11000) ?
            next(fireError(err, 'Failed, Either Email is registered before.', 409)) :
            next(fireError(err, 'Failed to update user.', 500)));
    // .then(result => res.status(204).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));
}


const updateInfo = (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((result) => res.status(200).end()).catch(err => (err.code === 11000) ?
        next(fireError(err, 'Failed, Either Email is registered before.', 409)) :
        next(fireError(err, 'Failed to update user.', 500)));
}

const remove = async (req, res, next) => {
    try {
        const doc = await User.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}
const login = async (req, res) => {
    User.findOne({ email: req.body.email }).then(async (adminInstance) => {
        try {
            if (adminInstance && await adminInstance.isValidPassword(req.body.password)) {
                const payload = { userID: adminInstance.id }
                const accessToken = jwtHelper.generateAccessToken(payload);
                return res.json({ accessToken: accessToken });
            } else return res.status(401).json({ msg: "Invalid username or password" })
        } catch (err) {
            return res.status(401).json({ msg: "Invalid username or password" })
        }
    }).catch(err => res.status(401).json({ msg: "Request failed, Contact Administrator." }));
}

const info = (req, res) => {
    User.findById(req.userID).select('username').then(result => result ? res.json(result) : res.status(404).end())
        .catch(() => res.status(500).end())
}

const userRoles = (req, res) => {
    User.findById(req.userID).select('roleIds').then(result => result ? res.json(result) : res.status(404).end())
        .catch(() => res.status(500).end());
}
const readUser = (req, res) => {
    User.findById(req.userID).then(result => result ? res.json(result) : res.status(404))
        .catch(err => {
            console.log(`🔴 ${err.message}`);
            res.status(500).json({ msg: "Failed." });
        });
}

module.exports = { createUser, readAll, readOne, readUser, update, remove, login, info, userRoles, updateInfo };
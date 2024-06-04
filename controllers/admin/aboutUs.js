const AboutUs = require('../../models/aboutUs');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const createAboutUs = (req, res, next) => {
    let query = {};
    if(req.files) {
        req.files.image ? query['imageUrl'] = req.files.image[0].path : 0;
        req.files.video ? query['videoUrl'] = req.files.video[0].path : 0;
    }
    const data = JSON.parse(req.body.data)
    AboutUs.create({ ...data, ...query })
        .then(result => res.status(202).end()).catch(err => (err.code === 11000) ?
            next(fireError(err, 'Failed, item title already exists.', 409)) :
            next(fireError(err, 'Failed to create new item.', 500)));
}

const create = (req, res, next) => {
    console.log(req.body)
    const data = JSON.parse(req.body.data)
    AboutUs.create({ ...data, ...(req.file ? { imageUrl: req.file.path } : {}) })
        .then(result => res.status(202).end()).catch(err => (err.code === 11000) ?
            next(fireError(err, 'Failed, item title already exists.', 409)) :
            next(fireError(err, 'Failed to create new item.', 500)));
}

const createVideo = (req, res, next) => {
    const data = JSON.parse(req.body.data);
    let mediaUrl;

    if (req.file) {
        mediaUrl = req.file.path;
    }

    AboutUs.create({ ...data, ...(mediaUrl ? { imageUrl: mediaUrl } : {}) })
    .then(result => res.status(202).end())
    .catch(err => {
        if (err.code === 11000) {
            next(fireError(err, 'Failed, item title already exists.', 409));
        } else {
            next(fireError(err, 'Failed to create new item.', 500));
        }
    });
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
            sort: 'whoWeAre.en',
        };

        // Define the filter condition
        const query = filter ? { 'whoWeAre.en': { $regex: filter, $options: 'i' } } : {};

        // Perform pagination with filter
        const result = await AboutUs.paginate(query, options);

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};

const readOne = (req, res, next) => AboutUs.findById(req.params.id)
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

    
const update = (req, res, next) => {
    let query = {};
    console.log(req.files)
    if(req.files) {
        req.files.image ? query['imageUrl'] = req.files.image[0].path : 0;
        req.files.video ? query['videoUrl'] = req.files.video[0].path : 0;
    }
    console.log(query);
    const data = JSON.parse(req.body.data)
    AboutUs.updateOne({ _id: req.params.id }, { ...data, ...query })
        .then(result => res.status(204).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));

}

const updateVideo = (req, res, next) => {
    console.log(req.body)
    const data = JSON.parse(req.body.data)
    AboutUs.updateOne({ _id: req.params.id }, { ...data, ...(req.file ? { imageUrl: req.file.path } : {}) })
        .then(result => res.status(204).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));
}

const remove = async (req, res, next) => {
    try {
        const doc = await AboutUs.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}

module.exports = { create, readAll, readOne, update, remove ,createVideo,updateVideo,createAboutUs};
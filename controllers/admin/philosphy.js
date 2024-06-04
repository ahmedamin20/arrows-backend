const Philosphy = require('../../models/philosphy');
const fireError = require('../../utils/error');
const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    console.log('Files received:', req.files); // Log received files
    console.log(req.body.data)
    const data = JSON.parse(req.body.data);
    const images = req.files; // Assuming you're using `imageUpload.array('images', 2)` to handle multiple files

    // Check if files are received
    if (!images || images.length === 0) {
        return res.status(400).json({ error: 'No files received' });
    }

    // Extract file paths from req.files and store them in an array
    const imagesUrl = images.map(image => image.path);

    console.log('Image URLs:', imagesUrl); // Log extracted image URLs

    // Create a new Philosphy document with the form data and image paths
    Philosphy.create({ ...data, imagesUrl })
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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = limit * (page - 1);
    const filter = req.query.filter;
    const options = {
        offset: offset || 0,
        limit: limit || MAX_DOCUMENTS_COUNT,
    };
    Philosphy.paginate(filter ? ({ $text: { $search: `"${filter}"` } }) : {}, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to read.', 500)));
}

const readOne = (req, res, next) => Philosphy.findById(req.params.id)
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

const update = (req, res, next) => {
    console.log(req.body)
    Philosphy.updateOne({ _id: req.params.id }, req.body).then(result => res.status(204).end())
    .catch((err) => next(fireError(err, 'Failed to update.', 500)));
}



const remove = async (req, res, next) =>
Philosphy.deleteOne({ _id: req.params.id }).then(result => res.status(204).end())
        .catch(err => next(fireError(err, 'Failed to delete.', 500)));

module.exports = { create, readAll, readOne, update, remove };
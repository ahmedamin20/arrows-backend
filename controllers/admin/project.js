const Project = require('../../models/project');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const create = (req, res, next) => {
    console.log("hehrrr")
    console.log('Files received:', req.files); // Log received files
    console.log(req.body.data)
    const data = JSON.parse(req.body.data);
    const files = req.files; // Assuming you're using `imageUpload.array('images', 2)` to handle multiple files

    // Check if files are received
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files received' });
    }

    console.log(files,"njljljlj")
    // Extract file paths from req.files and store them in an array
    const imageUrl = files?.image.map(image => image.path);

    console.log('Image URLs:', imageUrl); // Log extracted image URLs

    const iconUrl = files?.icon[0].path;
    console.log(iconUrl);
    Project.create({ ...data,imageUrl,iconUrl })
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
            sort: 'title.en',
        };

        // Define the filter condition
        const query = filter ? { 'title.en': { $regex: filter, $options: 'i' } } : {};

        // Perform pagination with filter
        const result = await Project.paginate(query, options)

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};

const readOne = (req, res, next) => Project.findById(req.params.id).populate('services', 'title').populate('subServices','title')
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

    const update = (req, res, next) => {
        console.log(req.body)
        Project.updateOne({ _id: req.params.id }, req.body).then(result => res.status(204).end())
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));
    }

const remove = async (req, res, next) => {
    try {
        const doc = await Project.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}

module.exports = { create, readAll, readOne, update, remove };
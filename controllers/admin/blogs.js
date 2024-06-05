const blogs = require('../../models/blogs');
const { BUCKET_NAME } = require('../../utils/constants');
const fireError = require('../../utils/error');
const supabase = require('../../utils/supabaseClient'); // Adjust the path as necessary

const MAX_DOCUMENTS_COUNT = 1000;

const uploadToSupabase = async (file) => {
    const { originalname, buffer, mimetype } = file;
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalname}`;
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`public/images/${filename}`, buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimetype
        });
    if (error) throw error;
    return data.Key;
};

const create = async (req, res, next) => {
    console.log(req)
    debugger
    try {
        const data = JSON.parse(req.body.data);
        if (req.file) {
            const imageUrl = await uploadToSupabase(req.file);
            data.imageUrl = imageUrl;
        }
        await blogs.create(data);
        res.status(202).end();
    } catch (err) {
        if (err.code === 11000) {
            next(fireError(err, 'Failed, item title already exists.', 409));
        } else {
            next(fireError(err, 'Failed to create new item.', 500));
        }
    }
};

const createVideo = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        if (req.file) {
            const videoUrl = await uploadToSupabase(req.file);
            data.imageUrl = videoUrl;
        }
        await blogs.create(data);
        res.status(202).end();
    } catch (err) {
        if (err.code === 11000) {
            next(fireError(err, 'Failed, item title already exists.', 409));
        } else {
            next(fireError(err, 'Failed to create new item.', 500));
        }
    }
};

const update = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        if (req.file) {
            const imageUrl = await uploadToSupabase(req.file);
            data.imageUrl = imageUrl;
        }
        await blogs.updateOne({ _id: req.params.id }, data);
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to update.', 500));
    }
};

const updateVideo = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        if (req.file) {
            const imageUrl = await uploadToSupabase(req.file);
            data.imageUrl = imageUrl;
        }
        await blogs.updateOne({ _id: req.params.id }, data);
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to update.', 500));
    }
};

const readAll = async (req, res, next) => {
    try {
        console.log(req.query.filter);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || MAX_DOCUMENTS_COUNT;
        const offset = limit * (page - 1);
        const filter = req.query.filter;

        const options = {
            offset: offset,
            limit: limit,
            sort: 'title.en',
        };

        const query = filter ? { 'title.en': { $regex: filter, $options: 'i' } } : {};

        const result = await blogs.paginate(query, options);

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};

const readOne = (req, res, next) => blogs.findById(req.params.id)
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

const remove = async (req, res, next) => {
    try {
        const doc = await blogs.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500));
    }
};

module.exports = { create, readAll, readOne, update, remove, createVideo, updateVideo };

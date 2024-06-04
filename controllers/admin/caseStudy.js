const caseStudy = require('../../models/caseStudy');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;


// const create = (req, res, next) => {
//     console.log(req.body.data)
//     const data = JSON.parse(req.body.data);
//     const files = req.files; // Assuming you're using `imageUpload.array('images', 2)` to handle multiple files

//     // Check if files are received
//     if (!files || files.length === 0) {
//         return res.status(400).json({ error: 'No files received' });
//     }
//     console.log(files)

//     const imageHomePageCoverUrl = files?.imageHomePageCover[0].path;
//     const imageCoverUrl = files?.imageCover[0].path;
//     const companyLogoUrl = files?.companyLogo[0].path;
//     const bannerUrl = files?.banner[0].path;

//     caseStudy.create({ ...data, imageHomePageCoverUrl,bannerUrl, companyLogoUrl,imageCoverUrl})
//         .then(result => res.status(202).end())
//         .catch(err => {
//             if (err.code === 11000) {
//                 next(fireError(err, 'Failed, item title already exists.', 409));
//             } else {
//                 next(fireError(err, 'Failed to create new item.', 500));
//             }
//         });
// }

const create = (req, res, next) => {
    try {
        // Parse the incoming data
        const data = JSON.parse(req.body.data);
        const files = req.files; // Assuming files are uploaded as an array

        // Check if the required files are received
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files received' });
        }

        // Check and assign file paths
        const imageHomePageCoverUrl = files.imageHomePageCover?.[0]?.path;
        const imageCoverUrl = files.imageCover?.[0]?.path;
        const companyLogoUrl = files.companyLogo?.[0]?.path;
        const imageUrl = files.image?.[0]?.path;

        if (!imageHomePageCoverUrl || !imageCoverUrl || !companyLogoUrl || !imageUrl) {
            return res.status(400).json({ error: 'Required files are missing' });
        }


        // Create new CaseStudy object
        const caseStudyData = {
            ...data,
            imageHomePageCoverUrl,
            imageCoverUrl,
            companyLogoUrl,
            imageUrl
        };

        // Save the CaseStudy object to the database
        caseStudy.create(caseStudyData)
            .then(result => res.status(201).json(result))
            .catch(err => {
                if (err.code === 11000) {
                    next(fireError(err, 'Failed, item title already exists.', 409));
                } else {
                    next(fireError(err, 'Failed to create new item.', 500));
                }
            });
    } catch (err) {
        console.error('Error parsing request data:', err);
        next(fireError(err, 'Invalid request data', 400));
    }
};

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
        const result = await caseStudy.paginate(query, options)

        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to read.', 500));
    }
};

const readOne = (req, res, next) => caseStudy.findById(req.params.id)
.populate('services', 'title').populate('subServices','title').populate('projects','title')
    .then(item => item ? res.json(item) : res.status(404).end())
    .catch((err) => next(fireError(err, 'Failed to read.', 500)));

    


const update = (req, res, next) => {
    console.log('Files received:', req.files); // Log received files
    console.log(req.body.data);
    const data = JSON.parse(req.body.data);
    const files = req.files; // Assuming you're using `imageUpload.array('images', 2)` to handle multiple files
    
    try {
        // Extract icon URL
        const homePageCoverImageUrl = files?.imageHomePageCover?.[0]?.path || null;
        const imageCoverUrl = files?.imageCover?.[0]?.path || null;
        const companyLogoUrl = files?.companyLogo?.[0]?.path || null;
        const imageUrl = files?.image?.[0]?.path || null;

        // Prepare update object with received data and file URLs
        const updateObject = {
            ...data,
            ...(homePageCoverImageUrl ? { homePageCoverImageUrl: homePageCoverImageUrl } : {}),
            ...(imageCoverUrl ? { imageCoverUrl: imageCoverUrl } : {}),
            ...(companyLogoUrl ? { companyLogoUrl: companyLogoUrl } : {}),
            ...(imageUrl ? { imageUrl: imageUrl } : {})
        };

        // Update the project with the prepared update object
        caseStudy.updateOne({ _id: req.params.id }, updateObject)
        .then(result => {
            console.log('Project updated successfully');
            res.status(204).end();
        })
        .catch(err => {
            console.error('Failed to update project:', err);
            next(fireError(err, 'Failed to update project.', 500));
        });
    } catch (error) {
        console.error('Error processing files:', error);
        res.status(400).json({
            message: 'Error processing files',
            error: error.message
        });
    }
};


const remove = async (req, res, next) => {
    try {
        const doc = await caseStudy.findById(req.params.id);
        await doc.deleteOne();
        res.status(204).end();
    } catch (err) {
        next(fireError(err, 'Failed to delete.', 500))
    }
}

module.exports = { create, readAll, readOne, update, remove };
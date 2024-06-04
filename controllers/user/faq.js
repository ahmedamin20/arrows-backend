const faq = require('../../models/faq');
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
    };
    faq.paginate(filter ? ({ $text: { $search: `"${filter}"` } }) : {}, options)
        .then(result => { res.json({ items: result.docs, count: result.total }) })
        .catch((err) => next(fireError(err, 'Failed to update.', 500)));
}


const readOne = async (req, res) => faq.findById(req.params.id)
    .then(Blogs => Blogs ? res.json(Blogs) : res.status(404).end())
    .catch(error => res.status(500).end());
    
const readByService = async (req, res, next) => {
        try {
            const serviceId = req.params.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || MAX_DOCUMENTS_COUNT;
            const offset = limit * (page - 1);
            
            const options = {
                offset: offset,
                limit: limit,
                sort: 'title',
            };
    
            const filter = { serviceId: serviceId };
            
            const result = await faq.paginate(filter, options);
    
            res.json({ items: result.docs, count: result.total });
        } catch (error) {
            next(fireError(error, 'Failed to read FAQs by service.', 500));
        }
    };
    const read = async (req, res, next) => {
        try {
            // Construct query to find FAQs with no associated service
            const filter = { serviceId: { $exists: false } };
    
            // Pagination options
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || MAX_DOCUMENTS_COUNT;
            const offset = limit * (page - 1);
            const options = {
                offset: offset,
                limit: limit,
                sort: 'title',
            };
    
            // Execute query
            const result = await faq.paginate(filter, options);
    
            // Return results
            res.json({ items: result.docs, count: result.total });
        } catch (error) {
            next(fireError(error, 'Failed to read FAQs.', 500));
        }
    };
module.exports = { readAll ,readOne ,readByService,read};   
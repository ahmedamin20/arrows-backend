const Project = require('../../models/project');
const fireError = require('../../utils/error');

const MAX_DOCUMENTS_COUNT = 1000;

const readAll = async (req, res, next) => {
    try {
        
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || MAX_DOCUMENTS_COUNT;
        const offset = limit * (page - 1);

        // Filter by service ID (if provided)
        const serviceId = req.query.filter;;

        
        // Query filter
        const filter = {};
        if (serviceId) {
            filter.services = serviceId;
        }

        
        // Pagination options
        const options = {
            offset: offset || 0,
            limit: limit,
            sort: 'title.en', // Adjust sorting criteria as needed
        };

        // Execute query
        const result = await Project.paginate(filter, options);        
        // Return results
        res.json({ items: result.docs, count: result.total });
    } catch (error) {
        next(fireError(error, 'Failed to fetch projects.', 500));
    }
};

const readOne = async (req, res) => Project.findById(req.params.id)
    .then(Project => Project ? res.json(Project) : res.status(404).end())
    .catch(error => res.status(500).end());

const readHighlighted = async (req, res) => {
    try {
        const highlightedBlogs = await Project.find({ isHighlighted: true });
        res.json(highlightedBlogs);
    } catch (error) {
        res.status(500).end();
    }
};

const readByService = async (req, res, next) => {
    try {
        const projects = await Project.find({ services: req.params.id });
        res.json(projects);
    } catch (error) {
        next(fireError(error, 'Failed to fetch projects by service ID.', 500));
    }
};

const readBySubService = async (req, res, next) => {
    try {
        const projects = await Project.find({ subServices: req.params.id });
        res.json(projects);
    } catch (error) {
        next(fireError(error, 'Failed to fetch projects by sub-service ID.', 500));
    }
};
module.exports = { readAll, readOne, readHighlighted ,readBySubService ,readByService };   
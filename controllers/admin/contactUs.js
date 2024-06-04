const contactUs = require('../../models/requets');
const fireError = require('../../utils/error');
const statusEnum = require('../../enum/supportRequestStatus')

const MAX_DOCUMENTS_COUNT = 100000;
const readAll = (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const filter = req.query.filter ? req.query.filter.toLowerCase() : null;
    const startDate = req.body.dateRange ? req.body.dateRange.start: null;
    const endDate = req.body.dateRange ? req.body.dateRange.end : null;
    //     const categories = req.body.category;


    contactUs.find()
        .then(result => {
            let filteredResult = result;
            if (filter) {
                const filterText = filter.toLowerCase();
                filteredResult = filteredResult.filter(doc => {
                    const fullName = `${doc.firstName} ${doc.lastName}`.toLowerCase();
                    const email = doc.email.toLowerCase();
                    return fullName.includes(filterText) || email.includes(filterText);
                });
            }

            if (startDate && endDate) {
                filteredResult = filteredResult.filter(doc => {
                    const createdAt = new Date(doc.createdAt);
                    return createdAt >= new Date(startDate) && createdAt < new Date (endDate);
                });
            }

            const sortedResult = filteredResult.sort((a, b) => b.createdAt - a.createdAt);
            const paginatedResult = page && limit ? sortedResult.slice((page - 1) * limit, page * limit) : sortedResult;

            res.json({ items: paginatedResult, count: sortedResult.length });
        })
        .catch(err => next(fireError(err, 'Failed to read')));
};
const remove = async (req, res, next) =>
    contactUs.deleteOne({ _id: req.params.id }).then(result => res.status(204).end())
        .catch(err => next(fireError(err, 'Failed to delete.', 500)));

const updateComment = async (req, res, next) =>
contactUs.findOneAndUpdate({ _id: req.params.id }, { comment: req.body.comment })
   .then(result => res.json({data : result})) .then(result => res.status(200).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));


const update = (req, res, next) => {
    contactUs.updateOne({ _id: req.params.id }, { status: req.body.status })
        .then(result => res.status(204).end()).catch((err) => next(fireError(err, 'Failed to update.', 500)));
}

const deleteSelected = (req, res, next) => {
    contactUs
      .deleteMany({ _id: { $in: req.body } })
      .then((result) => res.status(204).end())
      .catch((err) => next(fireError(err, 'Failed to delete.', 500)));
  };
  



module.exports = { readAll, remove, update ,updateComment,deleteSelected}
const Page = require('../../models/page')
const fireError = require('../../utils/error');
const MAX_DOCUMENTS_COUNT = 1000;

const readAll = (req, res) => {
    Page.find({ isPopulate: true }).sort({ order: 1 }).select(['-loDetails'])
        .then(pages => res.json(pages)).catch(error => res.status(500).end());
}

module.exports={readAll}
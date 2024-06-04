const contactUsRequest = require('../../models/requets');

const createContact = async (req, res, next) => {
    const contact = await contactUsRequest.create(req.body)
    res.status(201).json(contact)
}

module.exports = { createContact }
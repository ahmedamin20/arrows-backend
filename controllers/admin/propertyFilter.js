const PropertyFilter = require('../../models/propertyFilter');
const fireError = require('../../utils/error');

const readPlatform = (req, res, next) => {
  PropertyFilter.findOne({ property: 'platform' })
  .then(result => res.json(result))
  .catch(err => next(fireError(err, "Failed to read property filter [Platform]", 500)))
}

const readBrand = (req, res, next) => {
  PropertyFilter.findOne({ property: 'brand' })
  .then(result => res.json(result))
  .catch(err => next(fireError(err, "Failed to read property filter [Brand]", 500)))
}

const readLanguages = (req, res, next) => {
  PropertyFilter.findOne({ property: 'languages' })
  .then(result => res.json(result))
  .catch(err => next(fireError(err, "Failed to read property filter [Languages]", 500)))
}

const readFunction = (req, res, next) => {
  PropertyFilter.findOne({ property: 'function' })
  .then(result => res.json(result))
  .catch(err => next(fireError(err, "Failed to read property filter [Function]", 500)))
}
const readDeliveryType = (req, res, next) => {
  PropertyFilter.findOne({ property: 'deliveryType' })
  .then(result => res.json(result))
  .catch(err => next(fireError(err, "Failed to read property filter [Delivery Type]", 500)))
}

// const readLevels = (req, res, next) => {
//   PropertyFilter.findOne({ property: 'levels' })
//   .then(result => res.json(result))
//   .catch(err => next(fireError(err, "Failed to read property filter [Levels]", 500)))
// }

const readAvailability = (req, res, next) => {
  PropertyFilter.findOne({ property: 'availability' })
  .then(result => res.json(result))
  .catch(err => next(fireError(err, "Failed to read property filter [Levels]", 500)))
}
module.exports = {
  readPlatform,
  readBrand,
  readLanguages,
  readFunction,
  readDeliveryType,
  //readLevels,
  readAvailability
}
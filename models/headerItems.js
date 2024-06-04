const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const subItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  order:{
    type:Number,required:true }
});

const headerItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  order:{type:Number,required:true},
  subItems: [subItemSchema]
});

headerItemSchema.plugin(mongoosePaginate);

const HeaderItem = mongoose.model('HeaderItem', headerItemSchema);

module.exports = HeaderItem;

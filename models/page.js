const mongoose = require('mongoose');

const p = mongoose.Promise = require('bluebird');

const pageSchema = new mongoose.Schema({
    name:{type:String},
    code:{type:String},
    path:{type:String},
    icon:{type:String},
    class:{type:String},
    order:Number
})



module.exports=mongoose.model('Page',pageSchema)


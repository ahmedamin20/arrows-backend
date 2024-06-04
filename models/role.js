const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const roleSchema = new mongoose.Schema({
    title:{type:String ,unique:true},
    pageIds:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }]
});

roleSchema.plugin(mongoosePaginate);
roleSchema.index({'title': 'text'});

roleSchema.pre('updateOne', async function (next) {
    try {
        const oldData = await this.model.findOne(this.getQuery());
        const newData = this.getUpdate();
    } catch (err) { console.log(err); next(err) }
});

module.exports=mongoose.model('Role',roleSchema)
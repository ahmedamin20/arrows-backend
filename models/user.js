const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 4 },
    firstname:{ type: String, required: true, minlength: 3},
    lastname:{type: String, required: true, minlength: 3},
    email:{type:String, required: true ,unique:true},
    password: { type: String, required: true, minlength: 8 },
    roleIds:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

userSchema.plugin(mongoosePaginate);
userSchema.index({'$**': 'text'});

userSchema.pre('updateOne', function  (next) {
    if(!this.getUpdate().password)
     this.findById(this.getUpdate()._id).then(user=>
        this.getUpdate().password = user.password
        ).catch((err)=>console.log(err));
    else
        bcrypt.hash(this.getUpdate().password, 10).then(hash => {
            this.getUpdate().password = hash;
            next();
        }).catch((err) => next(err));
});

userSchema.pre('save', function (next) {
    if (this.isNew) {
        bcrypt.hash(this.password, 10).then(hash => {
            this.password = hash;
            next();
        }).catch((err) => next(err));
    }
});
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        console.log(err)
        return false
    }
}

// roleSchema.post('deleteOne', { query: false, document: true });
module.exports=mongoose.model('User',userSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 4, unique: true },
    password: { type: String, required: true, minlength: 8 }
});

adminSchema.pre('save', function (next) {
    if (this.isNew) {
        bcrypt.hash(this.password, 10).then(hash => {
            this.password = hash;
            next();
        }).catch((err) => next(err));
    }
});

adminSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        console.log(err)
        return false
    }
}
module.exports = mongoose.model('Admin', adminSchema);
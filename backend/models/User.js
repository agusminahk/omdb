const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async (next) => {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.validatePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);

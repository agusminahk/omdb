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
    status: {
        type: Boolean,
        default: true,
    },
    favorites: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);

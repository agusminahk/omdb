const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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

// Instance Method => check password
UserSchema.method({
    matchPassword: async function (password) {
        const res = await bcrypt.compareSync(password, this.password);
        return res;
    },
});

//Schema Hook => hash password
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
});

module.exports = model('User', UserSchema);

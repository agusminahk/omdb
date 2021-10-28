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
    age: {
        type: Number,
        min: 10,
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

UserSchema.method({
    matchPassword: async function (password) {
        const res = await bcrypt.compareSync(password, this.password);
        return res;
    },
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
});

// UserSchema.method('verify', function (password) {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(password, this.password, (err, res) => {
//             if (err) reject(err);
//             resolve(res);
//         });
//     });
// });
module.exports = model('User', UserSchema);

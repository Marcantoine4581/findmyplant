const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adress: {
        street: { type: String },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    profilPicture: { type: String }
});

module.exports = mongoose.model('User', userSchema);
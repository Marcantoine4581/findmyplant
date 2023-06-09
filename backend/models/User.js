const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adress: {
        street: { type: String },
        city: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false }
    },
    profilPicture: { type: String }
});

module.exports = mongoose.model('User', userSchema);
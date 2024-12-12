const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'STAFF'], required: true },
    powers: [{ type: String }], // Array of strings
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

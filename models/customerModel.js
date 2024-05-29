const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        sex: {
            type: String,
            requied: true
        },
        age: {
            type: Number,
            requied: true
        },
    }
);

const Custoner = mongoose.model('Customer', customerSchema);

module.exports = Custoner
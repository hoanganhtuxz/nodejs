import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    title: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },

    email: {
        type: String,
        strim: true,
        maxLength: 52,
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 2000
    }
}, { timestamps: true });
module.exports = mongoose.model("contact", contactSchema)
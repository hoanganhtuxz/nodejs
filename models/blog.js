import mongoose from 'mongoose';
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 4000
    },
    photo: {
        data: Buffer,
        contentType: String
    }

}, { timestamps: true });
module.exports = mongoose.model("blog", blogSchema)
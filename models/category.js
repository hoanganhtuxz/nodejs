import mongoose from 'mongoose';
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    }

}, { timeStamp: true });
module.exports = mongoose.model("category", categorySchema)
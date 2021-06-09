import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    category: {
        type: ObjectId,
        ref: 'categories',
        require: true
    },
    price: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: true,
        type: Boolean
    },
    sold: {
        type: Number,
        default: 0
    }

}, { timestamps: true });
module.exports = mongoose.model("product", productSchema)
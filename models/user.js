import mongoose, {set } from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32,

    },
    email: {
        type: String,
        trim: true,
        require: true,
        // unique: 32,
    },
    hashed_password: {
        type: String,
        require: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
});
//
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encrytPassword(password)
    }).get(function() {
        return this._password
    });
userSchema.methods = {
    // moa hoa tu hasspas ve pass
    authenticate: function(plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    // ma hoa mat khau
    encrytPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return "";
        }
    }
}
module.exports = mongoose.model("User", userSchema);
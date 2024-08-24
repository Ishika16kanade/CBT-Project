const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileno: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ''
    }

});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
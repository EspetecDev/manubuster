const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        require: [true, 'Please add a name'],
        unique: true
    },
    email: {
        type: String, 
        require: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String, 
        require: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        require: true
    },
    avatar: {
        data: Buffer,
        contentType: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: {
        type: String, 
        require: [true, 'Please add a name']
    },
    platform: {
        type: String, 
        require: [true, 'Please add an email'],
        unique: true
    }
},
{
    timestamps: true
});
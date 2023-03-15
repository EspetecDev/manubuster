const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: {
        type: String, 
        require: [true, 'Please add a name']
    },
    platform: {
        type: String, 
        require: [true, 'Please add platform'],
        unique: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Please add owner']
    },
    cover: {
        data: Buffer,
        contentType: String
    },
    lentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reservedDate: {
        type: Date
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
const { Schema } = require('mongoose');

const badgeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type:String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //use moment to format date
        get: timestamp => dateFormat(timestamp),
    },
},
{
    toJSON: {
        getters: true
    }
});

module.exports = badgeSchema;
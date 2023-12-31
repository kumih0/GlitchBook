const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    createdAt: {
        type: Date,
        default: Date.now,
        //use moment to format date
        get: timestamp => dateFormat(timestamp),
    },
    //points? >:D
},
{
    toJSON: {
        getters: true
    }
});

//create badges model
const Badges = model('Badges', badgeSchema);

module.exports = Badges;
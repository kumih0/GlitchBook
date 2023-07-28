import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    commentBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //use moment to format date
        get: createdAtVal => dateFormat(createdAtVal)
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
},
    {
        toJSON: {
            getters: true
        },
        id: false
    });
//creating comment model
const Comment = model('Comment', commentSchema);

//exporting comment model
export default Comment;
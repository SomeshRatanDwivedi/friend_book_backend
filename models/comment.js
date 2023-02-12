const User=require('./user');
const Post=require('./post');
const Like=require('./like')
const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },

    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Like'
    },
},
{
    timestamps:true,
}
)


const Comment=mongoose.model('Comment', commentSchema);



module.exports=Comment;
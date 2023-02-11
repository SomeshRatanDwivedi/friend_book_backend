const Like=require('./like');
const Comment=require('./comment')
const User=require('./user')
const mongoose=require('mongoose');


const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },

    user:{
        type:String,
        required:true,
        ref:'User'
    },

    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Like'
    },

    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Comment'
    }

},
{
    timestamps:true
});


const Post=mongoose.model('Post', postSchema);


module.exports=Post;
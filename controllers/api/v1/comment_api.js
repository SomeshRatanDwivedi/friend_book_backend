const Comment=require('../../../models/comment');
const { populate } = require('../../../models/post');
const Post = require('../../../models/post');

module.exports.createComment=async(req, res)=>{
        try {
            const { post_id, content} = req.body;

            const comment=await Comment.create({
                content:content,
                user:req.user._id,
                post:post_id
            })

            const commentedPost=await Post.findById(post_id);
            commentedPost.comments.push(comment._id);
            commentedPost.save();
          
            const newComment=await Comment.findById(comment._id)
                                  .populate('user', ['-password', '-friends'])
                                  .populate('likes');
            return res.status(200).send({
                message: "Your comment is published",
                success: true,
                data: {
                    comment:newComment
                }
            })

    }catch(error){
        console.log("error in creating comment", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })
    }

}

module.exports.deleteComment=async(req, res)=>{
    try{

        const {comment_id, post_id} = req.query;

        const result=await Comment.findByIdAndDelete(comment_id);
        console.log(result);

        const commentedPost = await Post.findById(post_id);
        commentedPost.comments.pop(comment_id);
        commentedPost.save();
        return res.status(200).send({
            message: "Comment is deleted successfully",
            success: true,
        })


    }catch(error){
        console.log("error in deleting comment", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })  
    }

}


module.exports.getCommentOnPost=async(req, res)=>{
    try{
        const {post_id}=req.query;
        const post=await Post.findById(post_id)
                       .populate({
                        path:'comments',
                        populate:({
                            path:'user',
                            select:'_id name'
                        }),
                      
                       });

         console.log(post.comments)
        return res.status(200).send({
            message:`All the comments of post ${post_id}`,
            success:true,
            data:{
                comments:post.comments
            }
        })

    }catch(error){
        console.log("error in getting comment", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        }) 

    }

}
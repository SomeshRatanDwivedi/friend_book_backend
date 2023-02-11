  const Like=require('../../../models/like');
  const Post=require('../../../models/post');
const Comment = require('../../../models/comment');




module.exports.toggleLikes=async(req, res)=>{

    try{
        const { likeable_id, likeable_type } = req.query;
        

        let likeableObject;
        if (likeable_type == 'Post') {
            likeableObject = await Post.findById(likeable_id);
        }
        else {
            likeableObject = await Comment.findById(likeable_id);
        }
        const isliked = await Like.findOne({
            user: req.user._id,
            likeable: likeable_id,
            onModel:likeable_type
        })

        if(isliked){
            likeableObject.likes.pop(isliked._id);
            likeableObject.save();
            await Like.findByIdAndDelete(isliked._id);

        }
        else{

            const like = await Like.create({
                user: req.user._id,
                likeable: likeable_id,
                onModel: likeable_type
            });

            likeableObject.likes.push(like._id);
            likeableObject.save();
          
        }

     return res.status(200).send({
        message:"Request successfull",
        success:true,
        data:{
            deleted:isliked?true:false
        }
     })

    }catch(error){
        console.log("error in adding like", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })
    }
  

}


module.exports.getLikes=async(req, res)=>{

    try {
        const { likeable_id, likeable_type } = req.query;


        let likeable;
        if (likeable_type == 'Post') {
            likeable = await Post.findById(likeable_id).populate('likes');
        }
        else {
            likeable = await Comment.findById(likeable_id).populate('likes');
        }
     

        return res.status(200).send({
            message: "Request successfull",
            success: true,
            data: likeable.likes
        })

    } catch (error) {
        console.log("error in getting like", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })
    }

}

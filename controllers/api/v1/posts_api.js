const Post=require('../../../models/post');


module.exports.create=async(req, res)=>{
       try{
        if(!req.body.content){
            return res.status(400).send({
                message:"Please write something in post",
                success:false
            })
        }
         const postToCreate={
            content:req.body.content,
            user:req.user._id
         }
         const newPost=await Post.create(postToCreate);
         const newlyCreatedPost=await Post.findById(newPost._id)
                                .populate('user', ['-friends', '-password'])
                                .populate({
                                    path: 'comments',
                                    populate: ({
                                        path: 'user'
                                    }),
                                    populate: ({
                                        path: 'likes'
                                    })
                                })
                                .populate('likes');
                                 
         return res.status(200).send({
            message:"Post is created",
            data:{
                post:newlyCreatedPost
            },
            success:true
         })


       }catch(error){
           console.log("error in creating post", error);
           return res.status(500).send({
               message: 'Internal server error',
               success: false
           })
       }
}


module.exports.getPosts=async(req, res)=>{
    try{
        const {page=1, limit=10}=req.query;

        const posts=await Post.find({})
                    .limit(limit*1)
                    .skip((page-1)*limit)
                    .populate('user', ['-friends', '-password'])
                    .populate({
                        path:'comments',
                        populate:({
                            path:'user'
                        }),
                        populate:({
                            path:'likes'
                        })
                    })
                    .populate('likes');

        const count = await Post.countDocuments();
        const totalPages=Math.ceil(count/limit);
        return res.status(200).send({
            message:"All posts",
            data:{
                next:{
                    page:page+1,
                    limit:limit,
                    totalPages:totalPages

                },
                posts:posts
            },
            success:true
        })

    } catch (error) {
        console.log("error in getting post", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })
    }
}
const Friend = require("../../../models/friend");
const User = require("../../../models/user");

module.exports.fetchUserFriends=async(req, res)=>{
    try{
        const friends=await Friend.find({from_user:req.user._id})
                                   .populate('from_user', ['-password', '-friends'])
                                   .populate('to_user', ['-password', '-friends']);
        return res.status(200).send({
            message:`List of friends of id - ${req.user._id}`,
            success:true,
            data:{
                friends:friends
            }
        })


    } catch (error) {
        console.log("error in getting friends", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })
    }
};


module.exports.createFriendship=async(req, res)=>{
    try{

        const {user_id}=req.query;
        const loginUserId=req.user._id;
        let newFriend=await Friend.create({
            from_user:loginUserId,
            to_user:user_id
        });

        newFriend=await Friend.findById(newFriend._id)
            .populate('from_user', ['-password', '-friends'])
            .populate('to_user', ['-password', '-friends']);
       
        const requestSendUser=await User.findById(loginUserId);
        requestSendUser.friends.push(newFriend);
        requestSendUser.save();

        return res.status(200).send({
            message:"Now you're friend with Aakash",
            success:true,
            data:{
                friendship:newFriend
            }

        })



    } catch (error) {
        console.log("error in making friends", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })
    }
}


module.exports.deleteFriendship=async(req, res)=>{
      try{
        const {user_id}= req.query;
        const loginUserId=req.user._id
        
        const friendshipId = await Friend.findOne({ to_user: user_id })
        await Friend.deleteOne({_id:friendshipId});
        const loginUser=await User.findById(loginUserId);
          loginUser.friends.pop(friendshipId);
          loginUser.save();

        return res.status(200).send({
            message:'Friend removed',
            success:true
        })
        

      }catch(error){
          console.log("error in removing friends", error);
          return res.status(500).send({
              message: 'Internal server error',
              success: false
          })
      }
}

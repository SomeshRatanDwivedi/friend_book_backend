const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.signup=async(req, res)=>{
    try{

        if (req.body.password === req.body.confirm_password) {

            const isAlreadyUserExist=await User.findOne({email:req.body.email});
            if(isAlreadyUserExist){
                return res.status(401).send({
                    message: "User is already exist",
                    success: false
                })
            }
            const encryptedPassword=await bcrypt.hash(req.body.password, 10);
            const newUser=await User.create({
                ...req.body,
                password: encryptedPassword
            })
            res.status(200).send({
                message: "Sign up successfull, user created",
                success: true,
            })

        }
        else{
           return res.status(401).send({
            message:"Password and  confirm password does not match",
            success:false
           })

        }

    }catch(error){
        console.log("error in signup", error);
        return res.status(500).send({
            message:'Internal server error',
            success: false
        })
        
    }
     
     
}


module.exports.login=async(req, res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).send({
                message:"User does not exist",
                success:false
            })
        }

        const isPasswordCorrect=await bcrypt.compare(req.body.password, user.password);
        if(isPasswordCorrect){
            return res.status(200).send({
                message:"You are signed in successfully",
                data:{
                    token: jwt.sign(user.toJSON(), 'secret', { expiresIn: '100000000' }),
                    user:{
                        _id:user._id,
                        name:user.name,
                        email:user.email
                    }
                },
                success:true
            })
        }
        return res.status(401).send({
            message:"Username/Password is not matching",
            success:false
        })

    }catch (error) {
        console.log("error in signin", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })

    }
    
}

module.exports.userInfo=async(req, res)=>{
    try{
        const userId= req.params.id;
        const user=await User.findById(userId)
                             .populate('friends');
        return res.status(200).send({
            message:'User information',
            data:{
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    friends:user.friends

                }
            },
            success:true
        })

    }catch (error) {
        console.log("error in getting user info", error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false
        })

    }
    

}
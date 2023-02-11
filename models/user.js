const Friend=require('./friend')
const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true  
    },
    friends:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Friend'
    }
},
{
    timestamps:true
})



const User=mongoose.model('User', userSchema);


module.exports=User;
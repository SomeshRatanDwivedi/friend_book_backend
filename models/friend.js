const User= require('./user')
const mongoose = require('mongoose');


const friendSchema = mongoose.Schema({
    from_user:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'
    },
     to_user:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
     }
},
{
    timestamps: true
})

                               


const Friend = mongoose.model('Friend', friendSchema);


module.exports = Friend;
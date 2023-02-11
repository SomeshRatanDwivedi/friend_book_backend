const express=require('express');
const router=express.Router();


router.get('/', (req, res)=>{
    res.send("<h1>router</h1>")
})


router.use('/api', require('./api'));





























module.exports=router;
const express=require('express');
const usersController=require('../../../controllers/api/v1/users_api')
const router=express.Router();

router.get('/:id', usersController.userInfo);

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);





























module.exports=router;
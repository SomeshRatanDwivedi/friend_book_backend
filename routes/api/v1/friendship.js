const express=require('express');

const friendsController=require('../../../controllers/api/v1/friendship_api')
const passport=require('passport');

const router=express.Router();

router.get('/fetch_user_friends', passport.authenticate('jwt', {session:false}), friendsController.fetchUserFriends);
router.post('/create_friendship', passport.authenticate('jwt', {session:false}), friendsController.createFriendship);
router.post('/remove_friendship', passport.authenticate('jwt', { session: false }), friendsController.deleteFriendship);































module.exports=router
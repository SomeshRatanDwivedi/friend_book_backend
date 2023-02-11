const express=require('express');

const commentController=require('../../../controllers/api/v1/comment_api');
const passport=require('passport');

const router=express.Router();



router.post('/', passport.authenticate('jwt', {session:false}), commentController.createComment);
router.delete('/', passport.authenticate('jwt', {session:false}), commentController.deleteComment);
router.get('/', passport.authenticate('jwt', { session: false }), commentController.getCommentOnPost );



















module.exports=router;
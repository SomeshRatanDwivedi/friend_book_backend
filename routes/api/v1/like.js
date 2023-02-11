const express = require('express');
const likesController=require('../../../controllers/api/v1/like_api');
const passport=require('passport')
const router = express.Router();


router.get('/', passport.authenticate('jwt', { session: false }), likesController.getLikes);


router.post('/toggle', passport.authenticate('jwt', {session:false}), likesController.toggleLikes)
















module.exports = router;
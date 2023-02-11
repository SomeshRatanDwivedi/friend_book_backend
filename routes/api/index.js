const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("<h1>API</h1>")
})


router.use('/v1', require('./v1'))


























module.exports = router;
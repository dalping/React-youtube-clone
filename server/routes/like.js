const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {
    
    let varibale = {}

    if(req.body.videoId){
        varibale = {videoId: req.body.videoId}
    }else{
        varibale = {commentId: req.body.videoId}
    }
    
    Like.find(varibale)
    .exec((err, likes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, likes})
    })
});

module.exports = router;
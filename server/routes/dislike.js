const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");

//=================================
//             Like
//=================================

router.post("/getDislikes", (req, res) => {
    
    let varibale = {}

    if(req.body.videoId){
        varibale = {videoId: req.body.videoId}
    }else{
        varibale = {commentId: req.body.videoId}
    }
    
    Dislike.find(varibale)
    .exec((err, dislikes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, dislikes})
    })
});

module.exports = router;
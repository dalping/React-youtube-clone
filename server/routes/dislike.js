const express = require('express');
const router = express.Router();
const { Dislike } = require("../models/Like");
const { Like } = require("../models/Like");
//=================================
//             DisLike
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


router.post("/upDislike", (req, res) => {
    
    let varibale = {}

    if(req.body.videoId){
        varibale = {videoId: req.body.videoId}
    }else{
        varibale = {commentId: req.body.videoId}
    }

    // save to Like Collection

    const dislike = new Dislike(varibale)

    dislike.save((err, dislikeResult) => {
        if(err) return resjson({success:false, err})

        // if you already clicked Like => Down like
        Like.findByIdAndDelete(varibale)
        .exec((err, likeResult) => {
            if(err) return res.status(400).json({success:false, err})
            res.status(200).json({success: true})
        })
    })   
});

router.post("/unDislike", (req, res) => {
    
    let varibale = {}

    if(req.body.videoId){
        varibale = {videoId: req.body.videoId}
    }else{
        varibale = {commentId: req.body.videoId}
    }
    
    Dislike.findByIdAndDelete(varibale)
    .exec((err, res)=>{
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true})
    })
});


module.exports = router;
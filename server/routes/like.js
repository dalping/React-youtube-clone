const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Like");
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

router.post("/upLike", (req, res) => {
    
    let varibale = {}

    if(req.body.videoId){
        varibale = {videoId: req.body.videoId}
    }else{
        varibale = {commentId: req.body.videoId}
    }

    // save to Like Collection

    const like = new Like(varibale)

    like.save((err, likeResult) => {
        if(err) return resjson({success:false, err})

        // if you already clicked DisLike => Down dislike
        Dislike.findByIdAndDelete(varibale)
        .exec((err, disLikeResult) => {
            if(err) return res.status(400).json({success:false, err})
            res.status(200).json({success: true})
        })
    })   
});

router.post("/unlike", (req, res) => {
    
    let varibale = {}

    if(req.body.videoId){
        varibale = {videoId: req.body.videoId}
    }else{
        varibale = {commentId: req.body.videoId}
    }
    
    Like.findByIdAndDelete(varibale)
    .exec((err, result)=>{
        if(err) return result.status(400).json({success:false, err})
        res.status(200).json({success:true})
    })
});

module.exports = router;
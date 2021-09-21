const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({

    writer:{
        //User모델의 정보들을 전부 불러올 수 있다.
        type:Schema.Types.ObjectId,
        ref:'User' 
    },
    title:{
        type:String,
        maxlength: 50
    },
    description:{
        type:String,
    },
    privacy:{
        type:Number
    },
    filePath:{
        type:String,
    },
    category:{
        type:String,
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:String,
    },
    thumbnail:{
        type:String,
    }
}, {timestamps:true})

const Video = mongoose.model('Video', VideoSchema);

module.exports = { Video }
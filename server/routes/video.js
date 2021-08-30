const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require("multer");

var ffmpeg = require("fluent-ffmpeg");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/thumbnail", (req, res) => {

    let filePath ="";
    let fileDuration ="";
    //비디오 정보 가져오기
    //ffmpeg.setFfmpegPath('C:\Users\kbk\Desktop\ffmpeg\ffmpeg\bin\ffmpeg.exe');
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata); //all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    ffmpeg(req.body.url)
        .on('filenames', function (filenames) { //썸네일의 파일네임 생성
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)
            
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () { //썸네일 생성 후 무엇을 할것인지?
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileName:filenames, fileDuration: fileDuration})
        })
        .on('error',function(err){ //에러 발생 시
            console.error(err);
            return res.json({success: false, err});
        })
        .screenshots({ //
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3, //찍을 썸네일 갯수
            folder: 'uploads/thumbnails', //썸네일 저장위치
            size:'320x240', //썸네일 사이즈
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
});

module.exports = router;
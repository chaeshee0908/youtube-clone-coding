const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require('fluent-ffmpeg');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, '${Date.now()}_$(file.originalname}');
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

cosnt upload = multer({ storage: storage}).single('files');

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    
    // 비디오를 서버에 저장한다.
   
    VideoUploadPage(req, rs, err =>{
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/thumbnail', (req, res) => {
    
    // 썸네일 생성 하고 비디오 러닝타임도 가져오기
   
    ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = 'uploads/thumbnails/' + filenames[0]
    })
    .on('end', function() {
        console.log('Screenshots taken');
        return res.join({ success: true, url: filePath, fileName: filenames, fileDuration: fileDurations})
    })
    .on('error', fuction(err) {
        console.error(err);
        return res.json({ successs: false, err });
    })
    .screenshots({
        // Will take screenshots at 20%, 40%, 60% and 80% of the video
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        // '%b': input basename (filename w/o extension)
        filename: 'thumbnail-%b.png'
    })



})

module.exports = router;

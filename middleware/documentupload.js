const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Set up storage engine
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const fileName= Date.now()+path.extname(file.originalname);
        cb(null,fileName);
    }
})
const fileFilter=(req,file,cb)=>{
    // Accept only PDF and DOCX files
    if(file.mimetype==='application/pdf' || file.mimetype==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        cb(null,true);
    }else{
        cb(new Error('Unsupported file format'),false);
    }
}
// Initialize upload
const upload=multer({storage:storage,fileFilter:fileFilter,limits:{fileSize:5*1024*1024}}); 
module.exports=upload.single('file_path');
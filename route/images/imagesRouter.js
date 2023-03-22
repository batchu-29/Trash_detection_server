const router =require('express').Router();
const uploadImage=require('./uploadImage');
const queryImg=require('./queryImage')
router.use('/upload',uploadImage);
router.use('/query',queryImg);
module.exports=router;

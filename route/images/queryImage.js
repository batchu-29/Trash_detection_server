const router=require('express').Router()
const Image =require('../../models/images.js')

router.get('/',async (req,res)=>{
    try{
        const ImgList=await Image.find();
        return res.json(ImgList);
    }catch(e){
        console.log("ERROR"+e.toString());
    }
})
router.get('/:id',async (req,res)=>{
    try{
        const img = await Image.find({ flight_id: req.params.id }).exec();
        if (img == null) {
            console.log("Image Not Found!!");
            return res.status(404).json({ message: "Image not found" });
        }
        return res.json(img);
        
    }catch(e){
        console.log("ERROR"+e.toString());
    }
})
module.exports=router;
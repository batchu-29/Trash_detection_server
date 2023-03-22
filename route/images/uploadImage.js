const router=require('express').Router();
const Image=require('../../models/images')
const Mission=require('../../models/mission');
router.post('/addall',async(req,res)=>{
    try{
        const savedMission=await Image.insertMany(req.body);
        return res.json(savedMission);
    }catch(e){
        console.log("ERROR"+e.toString());
    }
})

module.exports=router;
const express=require('express')
const router =express.Router()
const Mission=require('../../models/mission')

router.get('/all',async (req,res)=>{
    try{
        const missions=await Mission.find();
        let mList=[]
        for(let i of missions){
            mList.push({
                name:i.name,
                description:i.descrption
            });
        }
        res.json(missions);

    }
    catch(e){
        console.log("ERROR"+e.toString());
        return res.status(404).json({message:e.toString()});
    }


});
router.get('/:name',async (req,res)=>{
    try{
        const mission=await Mission.findOne({name:req.params.name}).exec();
        console.log(JSON.parse(misson.waypoints));
        if(mission==null){
            console.log("Mission Not Found!!");
            return res.status(404).json({ message: "Mission not found" });
        }
        res.json(mission);


    }
    catch(e){
        console.log("ERROR"+e.toString());
        return res.status(404).json({message:e.toString()});
    }
})
module.exports=router;
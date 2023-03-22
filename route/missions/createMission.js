 const express=require('express');
const rout=express.Router();
const Mission=require('../../models/mission');
rout.get('/',(req,res)=>{
    res.send("we are on create mission")
})
rout.post('/',async (req,res)=>{
    const body=req.body;
    try{
        const newMission=new Mission(req.body);
        const savedMission=await newMission.save();
        res.json(savedMission);
    }
    catch(e){
        console.log("ERROR"+e.toString());
        return res.status(500).json({message:e.toString()});
    }
})
module.exports=rout;

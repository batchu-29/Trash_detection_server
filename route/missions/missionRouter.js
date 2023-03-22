const express=require('express');
const router=express.Router();
const createMissionRoute =require('./createMission')
const queryMission=require('./missionQuery')
router.use('/create',createMissionRoute)
router.use('/query',queryMission)
module.exports=router;
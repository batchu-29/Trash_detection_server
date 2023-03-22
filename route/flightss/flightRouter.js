const router=require('express').Router();
const createFlight=require('./createFlight')
const query=require('./flightQuery')
router.use('/create',createFlight);
router.use('/query',query);
module.exports=router;
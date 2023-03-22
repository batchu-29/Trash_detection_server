const router=require('express').Router();
const Flights=require('../../models/flight');
router.get('/',(req,res)=>{
    res.send('we are on create flight')
})
router.post('/',async (req,res)=>{
    const body=req.body;
    try{
    const newFlight=new Flights(req.body);
    const savedFlight=await newFlight.save();
    return res.json(savedFlight);
    }
    catch(e){
        console.log("ERROR"+e.toString());
        return res.status(404).json({message:e.toString()});
    }

});
module.exports=router;
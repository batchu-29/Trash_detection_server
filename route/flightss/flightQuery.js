const router=require('express').Router();
const Flights=require('../../models/flight')

router.get('/',async  (req,res)=>{
    try{
        const flight=await Flights.find();
        return res.json(flight);

    }
    catch(e){
        console.log("ERROR"+e.toString());
        return res.status(404).json({message:e.toString()});
    }

})
router.get('/:id',async (req,res)=>{
    try{
        const flight=await flights.findOne({_id:req.params.id}).exec();
        if(flight==null){
            console.log("flight not found");
            return res.status(404).json({ message: "Flight not found" });
        }



    }
    catch(e){
        console.log("ERROR"+e.toString());
        return res.status(404).json({message:e.toString()});
    }
})
module.exports=router;
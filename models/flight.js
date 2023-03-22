const mongoose =require('mongoose');
const FlightsSchema =mongoose.Schema({
    mission_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'missions',
        required:true
    },
    date:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('Flights',FlightsSchema);
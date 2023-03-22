const mongoose = require('mongoose');

const ImageSchema=mongoose.Schema({
    flight_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'flightss',
        required:true

    },
    date:{
       type:String,
       required:true
    },
    detect:{
        type:Number,
        required:true
    },
    main_url:{
        type:String,
        required:true
    },    
});


module.exports=mongoose.model('Image',ImageSchema);
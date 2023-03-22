const express =require('express')
const app=express()
const {WebSocket}=require('ws');
var expressWs=require('express-ws')(app);
const mongoose=require('mongoose')
const bodyParser=require ('body-parser');
app.use(bodyParser.json());
let cors=require('cors');
app.use(cors({
    origin:'http://localhost:3000',
}))
mongoose.connect( "mongodb+srv://pranav:pranav@cluster0.7etg9.mongodb.net/?retryWrites=true&w=majority",{useUnifiedTopology:true},()=>{
    console.log("mongodb  connected");
})
const missionRoute=require('./route/missions/missionRouter')
const imageRoute=require('./route/images/imagesRouter')
const flightsRoute=require('./route/flightss/flightRouter');
app.use('/mission',missionRoute)
app.use('/image',imageRoute);
app.use('/flight',flightsRoute);


app.get('/',(req,res)=>{
    res.send('<h1>hello!!!!</h1>')
})


let phoneConnected=false;
let droneConnected=true;
let droneInFlight=false;



app.ws('/socket/command',(ws,req)=>{
    const device= req.query.device;
    console.log("connected to ws /command");
    console.log(`device is ${device}`);
  
    if(device==='drone') droneConnected=true;
    else if(device==="phone") phoneConnected=true;
  
    ws.on('message',(msg)=>{
        console.log(msg);
        msg=JSON.parse(msg);
        console.log(msg);
            let {message,status,id}=msg;
            
            if(message==="can_launch"){
                if(droneConnected && phoneConnected){
                    console.log("dif "+droneInFlight);
  
                    if(!droneInFlight){
                        ws.send(JSON.stringify({"reply":true}));
                    }else{
                        ws.send(JSON.stringify({"reply":false}));
                    }
                }else{
                    ws.send(JSON.stringify({"reply":false}));
                }
            }
  
            else if(message==='gs_update'){
                if(status==="armed"){
                    console.log("Drone is Armed");
                    droneInFlight=true;
                }
                else if(status==="unarmed"){
                    console.log("Drone is Unarmed");
  
                    droneInFlight=false;
                }
            }
  
            else if(message==='LAUNCH'){
                
                
                if(!droneInFlight && droneConnected){
                    droneInFlight=true;
                    let {waypoints}=msg;
                   // console.log(waypoints)
                    //console.log( expressWs.getWss().clients)
                    expressWs.getWss().clients.forEach((client)=>{
                        
                        if (client && client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({command:"LAUNCH",waypoints,id}));
                          }
                    })
                }
            }
  
            else if(message=="location_update"){

              let {lat,long}=msg;
             
              expressWs.getWss().clients.forEach((client)=>{
                  if (client !== ws && client.readyState === WebSocket.OPEN) {
                      client.send(JSON.stringify({message:"location_update",lat,long}));
                    }
              });
            }
  
    });
  
  
    ws.id=device;
  
    ws.on('close',(msg)=>{
        console.log("closed connection with "+ws.id);
        if(device==='drone') droneConnected=false;
        else if(device==="phone") phoneConnected=false;
    });
  
  });
  
  /*
app.ws('/socket/command',(ws,req)=>{
    const device= req.query.device;
    console.log("connected to ws /command");
    console.log(`device is ${device}`);
  
    if(device==='drone') droneConnected=true;
    else if(device==="phone") phoneConnected=true;
    print(droneConnected)
    ws.on('message',(msg)=>{
            console.log(msg);
            msg=JSON.parse(msg);
            console.log(msg);
            



            let {message,status,id}=msg;
            
            if(message==="can_launch"){
                if(droneConnected && phoneConnected){
                    console.log("dif "+droneInFlight);
  
                    if(!droneInFlight){
                        ws.send(JSON.stringify({"reply":true}));
                    }else{
                        ws.send(JSON.stringify({"reply":false}));
                    }
                }else{
                    console.log("droneConnected"+droneConnected);
                    console.log("dif "+droneInFlight);
                    ws.send(JSON.stringify({"reply":false}));
                }
            }
  
            else if(message==='gs_update'){
                if(status==="armed"){
                    console.log("Drone is Armed");
                    droneInFlight=true;
                }
                else if(status==="unarmed"){
                    console.log("Drone is Unarmed");
  
                    droneInFlight=false;
                }
            }
  
            else if(message==='LAUNCH'){
                if(!droneInFlight && droneConnected){
                    droneInFlight=true;
                    let {waypoints}=msg;
                    expressWs.getWss().clients.forEach((client)=>{
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({command:"LAUNCH",waypoints,id}));
                          }
                    })
                }
            }
  
            else if(message=="location_update"){
              let {lat,long}=msg;
              expressWs.getWss().clients.forEach((client)=>{
                  if (client !== ws && client.readyState === WebSocket.OPEN) {
                      client.send(JSON.stringify({message:"location_update",lat,long}));
                    }
              });
            }
  
    });
  
  
    ws.id=device;
  
    ws.on('close',(msg)=>{
        console.log("closed connection with "+ws.id);
        if(device==='drone') droneConnected=false;
        else if(device==="phone") phoneConnected=false;
    });
  
  });

*/

app.listen(3001,()=>{
    console.log("listening...on 3001");
})

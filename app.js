const express = require('express')
const app = express()
//const firebase = require('firebase')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://rohit:i8EwouKiDU1MEfOm@cluster0.rnmsh.gcp.mongodb.net/<medical>?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
const bodyparser = require('body-parser');
const Calendar = require('./models/calendar');
app.use(express.static('public'))
app.use(cors())
var admin = require("firebase-admin");

var serviceAccount = require("./private.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zoho-test-ed70f.firebaseio.com"
});
app.use(async function(req,res,next){
     try {
         const uid = await admin.auth().verifyIdToken(req.headers.authorization)
         next()
     } catch (error) {
         res.status(203).send({
             data:[],
             status :"Error : Authorization error"
         })
     }
});
app.get('/events',async function(req,res){
    try {
        const data =  await Calendar.getData();
        res.send({
            data,
            status:"OK"
        });
    } catch (error) {
        res.status(400).send({
            data:[],
            status :"Error : Bad Request"
        })
    }
    
})

app.post('/event',bodyparser.json(),async function(req,res){
    try {
        const data = await Calendar.creates(req.body)
        res.send({
            data,
            status:"OK"
        });
    } catch (error) {
        res.status(400).send({
            data:[],
            status :"Error : Bad Request"
        })
    }
   
})
app.get('/range',bodyparser.json(),async function(req,res){
    console.log("range")
    try {
        const data = await Calendar.find({
            date:{
                $gte:req.body.gte,
                $lte:req.body.lte
            }
        })
        console.log(data)
        res.send({
            data,
            status:"OK"
        });
    } catch (error) {
        res.status(400).send({
            data:error,
            status :"Error : Bad Request"
        })
    }
   
})
app.post('/deleteEvent',bodyparser.json(),async function(req,res){
    try {
         await Calendar.delete(req.body.id)
        res.send({
            
            status:"OK"
        });
    } catch (error) {
        res.status(400).send({
            data:[],
            status :"Error : Bad Request"
        })
    }
   
})
app.post('/updateEvenet',bodyparser.json(),async function(req,res){
    try {
         await Calendar.update(req.body.id,req.body.data);
        res.send({
            
            status:"OK"
        });
    } catch (error) {
        res.status(400).send({
            data:[],
            status :"Error : Bad Request"
        })
    }
   
})

app.listen(process.env.PORT || 8080,function(){
    console.log("server is up !")
});
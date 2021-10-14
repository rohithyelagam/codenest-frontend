const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./schema');
const PORT = process.env.PORT || 4000;
const { Auth } = require("two-step-auth");
var otpuser =1234;
app.use(cors());
app.use(bodyParser.json());

// mongodb connection
const mongo_url ='mongodb+srv://rohith_yelagam:Aa1%40bcde@cluster0.tnpyv.mongodb.net/arenaDB?retryWrites=true&w=majority';

mongoose.connect(mongo_url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

two = ()=>{
    console.log("otp : "+otpuser);
}

async function login(emailId){
    const res = await Auth(emailId, "Spark-portal");
    otpuser = res.OTP;
    return res.OTP;
  }

// add new user
app.post('/new/user', (req, res) => {
    let userd=req.body;
    user.findOne({
        'email' : userd.email
                },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(data==null){
                console.log("user needs to be added");
                user.create(userd, (err,data) => {
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.status(201).send(data);
                    }
                })
               
            }else{
                console.log("user already exists");
                res.status(201).send(null);
            }

        }
    })
    
})

// login user
app.post('/login/user', (req, res) => {
    let userd=req.body;
    user.findOne({
        'email' : userd.email,
        'password':userd.password
                },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(data==null){
                console.log("invalid credidentials");
                res.status(201).send(data);
            }else{
                console.log("user succesfully logged in");
                res.status(201).send(data);
            }

        }
    })
    
})

//  forgot password
app.post('/forgot/user', (req, res) => {
    let userd=req.body;
    user.findOne({
        'email' : userd.email
                },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(data==null){
                console.log("invalid email");
                res.status(201).send(data);
            }else{
                var otp;
                 login(userd.email).then((data)=>{
                    res.status(201).send(data);
                 });
                 res.status(201).send(otp);
            }

        }
    })
    
})

// get otp
app.post('/forgot/otp', (req, res) => {
    let userd=req.body;
    user.findOne({
        'email' : userd.email
                },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if(data==null){
                console.log("invalid email");
                res.status(201).send(data);
            }else{
                login(userd.email);
                
                res.status(201).send(data);
            }

        }
    })
    
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
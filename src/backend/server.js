const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./schema');
const PORT = process.env.PORT || 4000;
const {Auth, LoginCredentials} = require('two-step-auth')
app.use(cors());
app.use(bodyParser.json());

LoginCredentials.mailID = "rohithyalagam2001@gmail.com"
LoginCredentials.password = "Aa1@bcde"
LoginCredentials.use = true

// 
var nodemailer = require('nodemailer');
var otp,msg;
const create_msg=()=>{
    msg = '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">'+
    '<div style="margin:50px auto;width:70%;padding:20px 0">'+
      '<div style="border-bottom:1px solid #eee">'+
        '<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Spark Portal</a>'+
      '</div>'+
      '<p style="font-size:1.1em">Hello,</p>'+
      '<p>Thank you for choosing Spark-Portal. Use the following OTP to complete your Sign Up procedures.</p>'+
      `<h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>`+
      '<p style="font-size:0.9em;">Regards,<br />Rohith Yelagam</p>'+
      '<hr style="border:none;border-top:1px solid #eee" />'+
      '<div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">'+
        '<p>Spark Portal Inc</p>'+
        '<p>Roorkee, Haridwar</p>'+
        '<p>Uttarakhand</p>'+
      '</div>'+
    '</div>'+
    '</div>';
}
const create_otp=()=>{
    otp = Math.floor(Math.random()*90000) + 10000;
    create_msg();
}
 
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service : 'Gmail',
 auth: {
        user: 'rohith_y@ec.iitr.ac.in',			//email ID
	    pass: 'Aa1@bcde'				//Password 
    }
});

function sendMail(email , emsg){
	var details = {
		from: 'rohith_y@ec.iitr.ac.in', // sender address same as above
		to: email, 					// Receiver's email id
		subject: 'Your OTP is ', // Subject of the mail.
		html: emsg				// Sending OTP 
	};


	transporter.sendMail(details, function (error, data) {
		if(error)
			console.log(error)
		else
			console.log(data);
		});
	}
	
	
	

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
                console.log("otp");
                create_otp();
                sendMail(userd.email,msg);
                const obj ={
                    otp:otp
                }
                res.status(201).send(obj);
                
            }

        }
    })
    
})

// get password
app.post('/get/pswd', (req, res) => {
    let userd=req.body;
    user.findOne({
        'email' : userd.email
                },(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
           res.status(201).send(data.password);
        }
    })
    
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


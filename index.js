const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const app = express();
const port = 3002
app.use(express.urlencoded({extended:false}))


mongoose.connect("mongodb+srv://ravinder451994:my2q7yYUh21u1VNP@cluster0.kxeph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", 
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log( 'Database Connected' ))

const userData = require('./modal/userModal');
const urlencodedParser = bodyParser.urlencoded({extends:false});


//start Ejs
app.set('view engine','ejs');

//public path
app.use(express.static('./public'));

app.get('/', (req, res) => {
  
  res.render('index');  
})
app.get('/adduser', (req, res) => {
  res.render('addUser');
})

//User Added
app.post('/adduser', urlencodedParser,[
  check('name', 'Please enter Valid Name').isAlpha(),
  check('phone', 'Please enter Valid Phone number').isMobilePhone(),
  check('email', 'Please enter Valid EmailID').isEmail(),
  check('password', 'Please enter Valid Password and Confirm Password').isAlphanumeric()
], async (req, res) => {
  
  const error = validationResult(req);
  
  if(!error.isEmpty()){
    const alert = error.array();
    res.render('addUser',{alert})
  }else{
    
    const password = await bcrypt.hash(req.body.password,10);
    const cpassword = bcrypt.compare(req.body.cpassword,password)
    if(cpassword){
      try{
        const userCreation = new userData({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          password: password,
          gender: req.body.gender
          });  
          await userCreation.save();
          res.render('addUser',{msg:'Data inserted!!'});
      }catch(err){
        res.render('addUser',{phone:err.errorResponse.keyPattern.phone,email:err.errorResponse.keyPattern.phone})
      }
      
    }else{
      res.send('Password not match')
    }
  }
})

app.get('/find',async (req, res)=>{
 const userlist = await userData.find({password:"$2b$10$rMfK/AsrZEcq5QohAo2KQOY9eGaWHWR3PDMr4ULhrNH.HO9xoTdTO"});
res.send(userlist);
})

app.get('*', (req, res) => {
  throw Error("The page you were looking for could not be found!!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('404', { error: err })
}
);

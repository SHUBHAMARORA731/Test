const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


const app = express();

//view engine setup 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder
app.use('/public', express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   // res.render('contact');
    res.render('index');
});

app.get('/cart',(req,res) =>{
     res.render('cart');
 });

 app.get('/checkout',(req,res) =>{
    res.render('checkout');
});

app.get('/product_detail',(req,res) =>{
    res.render('product_detail');
});

app.get('/products',(req,res) =>{
    res.render('products');
});

app.get('/register',(req,res) =>{
    res.render('register');
});

app.get('/index',(req,res) =>{
    res.render('index');
});


//  app.get('/*', function(req,res) {
//      data= fs.readFile('*',   function (err, data) {
//      res.setHeader('Content-Type', 'text/html');
//      res.send(data);
//  });


app.post('/send', (req, res) => {
    console.log(req.body);
    const output = `
    <p>You have a new contact message<p>
    <h3>Contact details</h3>
    <ul>
        <li>Name :${req.body.name}</li>
        <li>Company :${req.body.company}</li>
        <li>Email :${req.body.email}</li>
        <li>Phone :${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'coderscorpion15@gmail.com',
            clientId: '1059953266083-ue5iuvdpo3o6mqode2526dqdbnnl5a4m.apps.googleusercontent.com',
            clientSecret:'rkD4GBOE7_knLVyPVj4Yl6QH',
            refreshToken: '1/tyttVQ0S3JNqKgYL5jing0kUDtuVYAxVJ81S_OYbHQo',
            accessToken: 'ya29.GlvyBIVxz48-00pNwccq13VCjClpK_8Sg6ewf6vdWYFzCXDL0Fo-8g793N4o1extC9wlRmalAB_5qY2rCtST0CQS1tXJMl9MfaEKVPUvX-hu62voJvy9dSbjQJYk'
          }
    
    })
    
    var mailOptions = {
        from: 'Shubham',
     //   to: 'Mukesh.patil.2085@gmail.com',
     to: 'Shubhamarora900@gmail.com',
        subject: 'Test mail',
        text: 'Hello World!!',
        html: output
    }
    
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err.message);
        } else {
            console.log('Email Sent');
        }
        res.render('index', {msg:'Email has been sent'});
        
    });
    
});

app.listen(3000, () => console.log('server started..'));
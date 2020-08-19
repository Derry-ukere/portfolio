var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config()

var indexRouter = require('./routes/index');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app set up
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/', indexRouter);

//contact form
app.post('/send', (req,res)=>{
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Subject: ${req.body.subject}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
`;

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
      user: "info@derryukere.me", // generated ethereal user
      pass: "Derryukere1256"  // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"Derry UKERE" <info@derryukere.me>', // sender address
  to: 'ukderry@gmail.com', // list of receivers
  subject: 'New Contact Request', // Subject line
  text: 'contact Request', // plain text body
  html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);   
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
});

});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
});

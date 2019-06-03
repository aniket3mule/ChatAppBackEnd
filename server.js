require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var route = require('./route/Routes');
var expressValidator = require('express-validator');

const PORT = 3001;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/',route);

app.listen(PORT, ()=>{
    console.log('Litsning on port : '+PORT);
})

//   app.post('/api/login', function(req, res){
//       console.log(req.body);
      
//       var email = req.body.email;
//       var password = req.body.password;

//     client.connect((err, db, done)=>{
//         if(err){
//             return console.log(err);
//         }
//         else{
//             db.query('insert into userinformation (email, password) values($1, $2)',[email, password], (err, table)=>{
//                 if (err) {
//                     return console.log(err);
//                 }
//                 else{
//                     return console.log('Data inserted');
//                     db.end();
//                 }
//             });
//         } 
//     });
//   })
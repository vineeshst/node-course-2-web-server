const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');




app.use((req, res, next)=>{
  var now = new Date().toString();
//  console.log(`${now}: ${req.method} ${req.url}`);
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }

  });
  console.log(log);
  next();
});

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
  next();
});
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req, res)=>{
// res.send('<h1>Hello Express!</h1>');

res.send({
  name:'Andrew',
  likes:['Biking', 'Cities']
})
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    pageTitle:'About Pge'

  })
});
app.get('/home',(req, res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Pge',
    welcomeMessage:'Welcome to my website'
  })
});
app.get('/bad',(req, res)=>{
  res.send({
    errorMessage:'Unable to handle message'
  });
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});

var express = require("express");
var multer= require("multer");
var path=require("path");
var fs=require('fs');
var bodyParser=require("body-parser");

var app= express();
var upload = multer({dest:'uploads/'});

app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.get('/',function(req,res){
    res.render('form');
});

app.post('/upload',upload.single('file'),function(req,res){
    res.send({'size':req.file.size});
    fs.unlink('./uploads/'+req.file.filename,function(err){
        if(err) throw err;
        console.log('deleted '+req.file.filename + '.');
    })
    
});

app.listen(8080,function(){
    console.log('ex app running at 8080');
})
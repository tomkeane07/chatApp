const express = require('express');
const socket = require('socket.io');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require(__dirname+'/routes/router');



//App, DB setup
const app = express();
mongoose.connect("mongodb://localhost:27017/chatApp" ,{ useNewUrlParser:true });
mongoose.Promise = global.Promise;


//### assign EJS template engine to application specs ################
app.set("view engine","ejs");


//### Assign bodyParser & paths for static files #############
app.use(bodyParser.json()); 
app.use("/javaScript",express.static(__dirname + "/assets/javaScript"));
app.use("/",express.static(__dirname + "/assets",{ setHeaders: function(res,path,stat){
    res.type("text/css");
}}));
app.use("views", express.static(__dirname+"/views"));



//### Initial route #################### 
app.get("/",function(req,res){
    res.render("index.ejs");
});




var server = app.listen(4000, function(){
	console.log("listening to port 4000");
});


//Static Files
app.use( express.static('public'));

//socket setup
var io = socket(server);


io.on('connection', function(socket){
	console.log('made socket connect', socket.id);


	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});


});
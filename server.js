const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://nafis:nafisserver314@cluster0.bjmwamn.mongodb.net/mainDB").then(function(){
  console.log("connected");
});


const schema=new mongoose.Schema({
  name: String,
  bg: String,
  area: String,
  pn: String
});



const Person =mongoose.model("person",schema);


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));

var infos=[];


app.get("/",function(req,res){
  res.render("home");
});


app.get("/search",function(req,res){
  res.render("search");
});


app.get("/register",function(req,res){
  res.render("register");
});

app.get("/result",function(req,res){
  res.render("result",{infos:infos});
});

app.get("/success",function(req,res){
  res.render("success");
});

app.post("/register",function(req,res){


const person = new Person({
  name:req.body.name,
  bg:req.body.bg,
  pn:req.body.pn,
  area:req.body.area
});

person.save();

res.redirect("/success");

});

app.post("/search",function(req,res){
const data=[];
  Person.find({$and:[{bg:req.body.bg},{area:req.body.area}]}).then(function(data){
  infos=data;
}).catch(function(err){
  console.log(err);
});
res.redirect("/result");

});



app.listen(process.env.PORT || port,function(){
  console.log("server started");
});

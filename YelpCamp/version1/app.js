var express=require("express");
var app=express();
var bodyparser=require("body-parser");
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));

var campgrounds=[
		{name : "salemoncreek" ,image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name : "mojo santana" ,image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name : "montana island" ,image: "https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
	]


app.get("/",function(req,res)
		{
	res.render("landing");
});

app.get("/campgrounds",function(req,res)
	   {
	
	res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var imageurl=req.body.image;
	var newcampground={name:name , image: imageurl};
	campgrounds.push(newcampground);
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new",function(req,res){
	res.render("new");
})

app.listen(3000,function(){
	console.log("Yelpcamp version1 has started");
});
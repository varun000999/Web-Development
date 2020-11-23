var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundschema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
})

var campground=mongoose.model("campground",campgroundschema);


app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));




app.get("/",function(req,res)
		{
	res.render("landing");
});

app.get("/campgrounds",function(req,res)
	   {
		campground.find({}, function(err,allcampgrounds)
						{
			if(err)
				{
					console.log("error with /campgrounds get method")
				}
			else{
				res.render("campgrounds",{campgrounds: allcampgrounds});
			}
		});
});


app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var imageurl=req.body.image;
	var desc=req.description;
	var newcampground={name:name , image: imageurl, descriptioni: desc};
	campground.create(newcampground,function(err, newlycreated)
					  {
		if(err)
		{
			console.log("oh ho something wrong with campgrounds.create in app.post");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	//campgrounds.push(newcampground);
	
})

app.get("/campgrounds/new",function(req,res){
	res.render("new");
})

app.listen(3000,function(){
	console.log("Yelpcamp version2 has started");
});
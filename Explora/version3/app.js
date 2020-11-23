var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var campground=require("./models/campground");
var seedDB=require("./seeds");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



mongoose.connect("mongodb://localhost/yelp_camp_version3");



app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
seedDB();//each time deleting entries of database

app.get("/",function(req,res)
		{
	res.render("landing");//landing page
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
	var desc=req.body.description;
	var newcampground={name:name , image: imageurl, description: desc};
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

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    //campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


app.listen(3000,function(){
	console.log("Yelpcamp version5 has started");
});
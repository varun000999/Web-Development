var express= require("express");
var router  = express.Router();
var campground = require("../models/campground");

var router=express.Router();
router.get("/",function(req,res)
	   {
		campground.find({}, function(err,allcampgrounds)
						{
			if(err)
				{
					console.log("error with /campgrounds get method")
				}
			else{
				res.render("campgrounds/campgrounds.ejs",{campgrounds: allcampgrounds});
			}
		});
});


router.post("/",isLoggedIn,function(req,res){
	var name=req.body.name;
	var imageurl=req.body.image;
	var desc=req.body.description;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
	var newcampground={name:name , image: imageurl, description: desc, author:author};
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

router.get("/new",isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})

router.get("/:id", function(req, res){
    //find the campground with provided ID
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    //campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports= router;


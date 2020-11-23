var express= require("express");
var router  = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");
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


router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var imageurl=req.body.image;
	var price=req.body.price;
	var desc=req.body.description;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
	var newcampground={name:name , price:price ,image: imageurl, description: desc, author:author};
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

router.get("/new",middleware.isLoggedIn,function(req,res){
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

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});


module.exports= router;


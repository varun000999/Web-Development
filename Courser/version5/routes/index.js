var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res)
		{
	res.render("landing");
});

   //create new comment
   //connect new comment to campground
   //redirect campground show page

router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
   req.logout();
	req.flash("sucess","Logged you Out!!");
   res.redirect("/campgrounds");
});


module.exports = router;

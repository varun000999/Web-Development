var express=require("express");
var app=express();
var request=require("request");
app.set("view engine","ejs");

app.get("/",function(req,res)
	   {
	res.render("search");
})

app.get("/request",function(req,res)
	   {
	var query=req.query.search;
	if(query==="")
		{
			res.render("search");
		}
	else
		{
			var url="http://www.omdbapi.com/?s=" + query +"&apikey=thewdb "
	
	request(url,function(error,response,body)
		   {
		if(!error && response.statusCode === 200)
			{
				var formattedbody=JSON.parse(body);
				res.render("result",{formattedbody: formattedbody});
			}
	});
		}
});

app.listen(3000,function(req,res){
	console.log("movie app is running");
});
var mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var campgroundschema=new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})

module.exports=mongoose.model("campground",campgroundschema);
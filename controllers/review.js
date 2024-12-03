const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.reviewPost = async (req, res, next)=>{
    
    let newReview = new Review(req.body.review);
   let author = req.user;
   newReview.author = author;
await newReview.save();
  let {id} = req.params;
  let car = await Listing.findById(id);
  car.reviews.push(newReview._id);
 await car.save();
 req.flash("success", "Thanks for your Remarks...");
 res.redirect(`/cars/${id}`);
  
};

module.exports.reviewDelete = async(req, res, next)=>{
    let {id} = req.params;
    let {revid} = req.params;
     let revwOfDelReq = await Review.findById(revid);
  
     if (!revwOfDelReq) {
      req.flash("error", "Review not found!");
      return res.redirect(`/cars/${id}`);
    }
        if(req.user._id.equals(revwOfDelReq.author._id)){
          await Review.findByIdAndDelete(revid);
          req.flash("success", "Your Review is Deleted ...");
          res.redirect(`/cars/${id}`);
        } else {
          req.flash("error", "You don't have authority to delete it!!");
          res.redirect(`/cars/${id}`);
        }
  };
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");

module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      console.log(error);
      req.flash("error", errMsg);
      res.redirect("/cars/new");
      // throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

  module.exports.validateReview = (req, res, next)=>{
    let {id} = req.params;
    let {error} = reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      req.flash("error", errMsg);
      res.redirect(`/cars/${id}`);
    } else {
      next();
    }
  };

  module.exports.isLoggedIn = (req, res, next)=> {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route
    }
    req.flash('error', 'You must be logged in to access this page.');
    res.redirect('/login'); // Redirect to login if not authenticated
  
  };
const Listing = require("../models/listing.js");

module.exports.indexRoute = async (req, res)=>{
    let allCars = await Listing.find({});
    res.render("listings/index.ejs", {allCars});
   };

   module.exports.newFormRoute = (req, res)=>{
    res.render("listings/new.ejs");
  };

  module.exports.newCarPostRoute = async (req, res, next)=>{
     
    // let url = req.file.path;
    // let filename = req.file.filename;
    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename,
    }));
    const newListing = new Listing(req.body.addcar);
    let owner = req.user;
    newListing.owner = owner._id;
    newListing.image = await [...images];
     await newListing.save();
     req.flash("success", "Your Item has been listed successfully!")
    res.redirect("/cars");  
  };

  module.exports.showRoute =  async (req, res)=>{
    if(req.user){
    let {id} = req.params;
     let car = await Listing.findById(id).populate({path: "reviews", populate:{path: "author",},}).populate("owner");
     res.render("listings/show.ejs", {car});
    } else {
      req.flash("error", "You have to log in first..");
      res.redirect("/login");
    }
  };

  module.exports.editRoute = async (req, res)=>{
    let {id} = req.params;
    let car = await Listing.findById(id).populate("owner");
     if(req.user.id === car.owner.id){
     res.render("listings/edit.ejs", {car});
    } else {
      req.flash("error", "You are not the owner of this item!!");
      res.redirect(`/cars/${id}`);
    }
  };

  module.exports.editPostRoute =  async (req, res)=>{
    let {id} = req.params;
    let car = await Listing.findByIdAndUpdate(id, {...req.body.addcar});
 if(typeof req.files !== "undefined" && req.files.length > 0){
    // let url = req.file.path;
    // let filenmae = req.file.filename;
    // car.image = {url, filenmae};
    car.image = [];
    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename,
    }));
    car.image.push(...images);
     await car.save();
   }
     req.flash("success", "Your Post Updated Successfully!")
     res.redirect(`/cars/${id}`);
  };

  module.exports.deleteGetRoute = async (req, res)=>{
    let {id} = req.params;
    let car = await Listing.findById(id).populate("owner");
    if(req.user.username === car.owner.username){
      res.render("listings/delete.ejs", {car});
     } else {
        req.flash("error", "You are not the owner of this item!!");
        res.redirect(`/cars/${id}`);
      }
  };

  module.exports.deletePostRoute = async (req, res)=>{
     
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Your Post Delted Successfully!!");
    res.redirect("/cars");
  };

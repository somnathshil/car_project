const User = require("../models/user.js");



module.exports.signUpRoute =  (req, res)=>{
    res.render("listings/signup.ejs");
  };

  module.exports.signUpPostRoute =  async (req, res, next)=>{
    try{
      let {username, mobile, password} = req.body;
    const newUser = new User({
      mobile, username
  });
       
    let registeredUser = await User.register(newUser, password);  // user getting registered here but message will be shown after otp match 
    console.log(registeredUser);
    req.flash("success", "Your are registered Successfully!!");
   res.redirect("/cars"); 
  } catch (err){
    req.flash("error", "This Username or Phone Number Already Exists!!");
    res.redirect("/signup");
  }
  };

  module.exports.logInRoute = (req, res)=>{
    res.render("listings/login.ejs");
  };

  module.exports.logInPostRoute =  (req, res) => {
    req.flash("success", "Welcome! You are Successfully Logged In");
    const redirectUrl = res.locals.redirectUrl || "/cars";
    res.redirect(redirectUrl); // Redirect to the specified URL or default
  };

  module.exports.logOutRoute =  (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are Successfully logged out!");
        res.redirect("/cars");
    });
};
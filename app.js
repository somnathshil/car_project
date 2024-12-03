if(process.env.NODE_DEV != "production"){
require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");


const cars = require("./routes/cars.js");
const user = require("./routes/user.js");
const reviews = require("./routes/review.js");

const dbUrl = process.env.MONGO_ATLAS;

main()
.then(()=>{
    console.log("DB is connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};

app.set("view enginge", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: "mysupersecret",
  },
  touchAfter: 24 * 3600,
});

store.on("error", ()=>{
  console.log("Error In Mongo Session Store", err);
});

const sessionOptions = {
  store,
  secret: "mysupersecret",
  resave: false,
  saveUninitialized : false,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
    maxAge : 7 * 24 * 60 * 60 * 1000 ,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/cars", cars);
app.use("/", user);
app.use("/cars", reviews);

app.use((err, req, res, next)=>{
  console.log(err.stack);
    let {status=500, message="Some Error Occured"} = err;
    res.status(status).render("listings/error.ejs", {message});
    console.log(err);
});

app.listen(8080, ()=>{
    console.log("app is listening on port 8080");
});

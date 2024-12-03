const express = require("express");
const router = express.Router();
const wrapAsync = require("../untils/wrapAsync.js");
const {validateListing} = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudinary.js");
const upload = multer({storage});

const carControllers = require("../controllers/cars.js");

   router.get("/", carControllers.indexRoute);
   
   router.get("/new", isLoggedIn, carControllers.newFormRoute);
   
   router.post("/", upload.array('addcar[images]', 5), validateListing, wrapAsync(carControllers.newCarPostRoute) ); 
 
   router.get("/:id", carControllers.showRoute);
   
   router.get("/:id/edit",isLoggedIn, carControllers.editRoute);
   
   router.put("/:id",isLoggedIn, upload.array('addcar[images]', 5), validateListing, wrapAsync(carControllers.editPostRoute));
   
   router.get("/:id/delete", isLoggedIn, wrapAsync(carControllers.deleteGetRoute));
   
   router.delete("/:id", isLoggedIn, wrapAsync(carControllers.deletePostRoute));
   

   module.exports = router;
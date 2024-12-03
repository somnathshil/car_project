const express = require("express");
const router = express.Router();
const {validateReview} = require("../middleware.js");
const wrapAsync = require("../untils/wrapAsync.js");


const reviewControllers = require("../controllers/review.js");


router.post("/:id/reviews", validateReview, wrapAsync (reviewControllers.reviewPost));


router.delete("/:id/reviews/:revid", wrapAsync (reviewControllers.reviewDelete));

  module.exports = router;
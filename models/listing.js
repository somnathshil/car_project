const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("../models/review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    image: [
        {
          url: { type: String, required: true }, 
          filename: { type: String, required: true }, 
        }
      ],
    price: Number,
    company: String,
    country: String,
    reviews: [
        {type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref : "User",
    }
});

  listingSchema.post("findOneAndDelete",async (listing)=>{
      if(listing){
       await Review.deleteMany({_id: {$in: listing.reviews}});
      }
  })

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
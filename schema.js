  const Joi = require("joi");

  module.exports.listingSchema = Joi.object({
    addcar: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        company: Joi.string().required(),
        
})
  });

  module.exports.reviewSchema = Joi.object({
    review: Joi.object({
    comment: Joi.string().required(), 
    rating: Joi.number().min(1).max(5).required(), 
  }).required(),
  });

  
  // images: Joi.array()
  // .items(
  //   Joi.object({
  //     url: Joi.string().uri().required(),
  //     filename: Joi.string().required(),
  //   })
  // )
  // .min(1)
  // .max(5) 
  // .required(),
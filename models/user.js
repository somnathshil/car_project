const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    mobile: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
              return /^\d{10}$/.test(v); // Validates 10-digit mobile numbers
            },
            message: (props) => `${props.value} is not a valid 10-digit mobile number!`,
          },
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
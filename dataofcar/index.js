const mongoose = require('mongoose');
const initData = require("./data_car.js")
const Listing = require("../models/listing.js");

const dbUrl = process.env.MONGO_ATLAS;
main()
.then(()=>{
    console.log("DB is connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tryagain');
};


const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initilized");
};

initDB();

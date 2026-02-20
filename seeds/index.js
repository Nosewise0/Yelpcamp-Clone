const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelpcamp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 100) + 10;
    const camp = new Campground({
      author: "69636f581934baac10102822",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum ipsam ea reiciendis accusantium tempora soluta voluptates. Quam impedit aliquid odio, exercitationem atque magnam tempore similique, adipisci, enim rem doloribus illum!",
      price,
      image: [
        {
          url: "https://res.cloudinary.com/dr0gqzvmz/image/upload/v1769671286/YelpCamp/iywessybxno97mbxxdme.jpg",
          filename: "YelpCamp/iywessybxno97mbxxdme",
        },
        {
          url: "https://res.cloudinary.com/dr0gqzvmz/image/upload/v1769671286/YelpCamp/fbvtaprwvxfg2f76ppmq.jpg",
          filename: "YelpCamp/fbvtaprwvxfg2f76ppmq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

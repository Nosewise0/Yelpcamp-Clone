const mongoose = require("mongoose");
const review = require("./review");
const { ref, string } = require("joi");
const schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

// https://res.cloudinary.com/dr0gqzvmz/image/upload/v1770451033/YelpCamp/wbppab4wrqdkolje8sse.png

const ImageSchema = new schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchema = new schema({
  title: String,
  image: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  author: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
}, opts);

campgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0,20)}...</p>`;
}); 

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);


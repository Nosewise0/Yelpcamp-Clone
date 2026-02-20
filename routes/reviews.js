const express = require('express');
const router = express.Router({ mergeParams: true });

const expressError = require("../utils/expressError");
const catchAsync = require("../utils/catchAsync");

const Campground = require("../models/campground");
const reviews = require("../controllers/review")
const Review = require("../models/review");
const { reviewSchema } = require("../schemas");

const { validateReview, isloggedin, isReviewAuthor} = require("../middleware");

router.post(
  "/",
  isloggedin,
  validateReview,
  catchAsync(reviews.submitReview)
);

router.delete(`/:reviewId`, isloggedin, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
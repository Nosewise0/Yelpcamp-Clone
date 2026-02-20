const express = require("express");
const { model } = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isloggedin, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer  = require('multer')
const {storage} = require("../cloudinary");
const upload = multer({ storage });

const router = express.Router();

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isloggedin, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
  

router.get("/new", isloggedin, campgrounds.newForm);

router.route('/:id')
      .get(catchAsync(campgrounds.showPage))
      .put(isloggedin, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
      .delete(isloggedin,isAuthor,catchAsync(campgrounds.deleteCampground));



router.get("/:id/edit", isloggedin, isAuthor, catchAsync(campgrounds.editForm));

module.exports = router;
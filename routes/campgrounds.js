const express = require('express')
const router = express.Router()
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const campgrounds = require('../controllers/campgrounds');

const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');
const campground = require('../models/campground');
const multer  = require('multer')
const{ storage } = require('../cloudinary');
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),catchAsync(campgrounds.createCampground))

// // To make/create a new Camp Entry
router.get("/new",isLoggedIn, campgrounds.renderNewForm);


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),catchAsync(campgrounds.updatingCampground))
    .delete(isLoggedIn,isAuthor ,catchAsync(campgrounds.deleteCampground))



// IF NOT USING ROUTER.ROUTE() THEN USE THE BELOW CODE

// // Displays all the Campgrounds
// router.get("/",catchAsync(campgrounds.index));

// // To make/create a new Camp Entry
// router.get("/new",isLoggedIn, campgrounds.renderNewForm);

// // After FORM submission where the Data loads
// router.post("/",isLoggedIn,validateCampground, catchAsync(campgrounds.createCampground));

// // Detials Page about each CampSite
// router.get("/:id",catchAsync(campgrounds.showCampground));

// // Render the FORM where we Edit a Campground Entry
router.get("/:id/edit",isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));

// // PUT request , Data after Update/Edit
// router.put("/:id",isLoggedIn,isAuthor,validateCampground ,catchAsync(campgrounds.updatingCampground));

// // DELETE a CampEntry
// router.delete("/:id",isLoggedIn,isAuthor ,catchAsync(campgrounds.deleteCampground));

module.exports = router;
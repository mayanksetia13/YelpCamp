const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require('../models/review');
const Campground = require("../models/campground");
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const reviews = require('../controllers/reviews');


  // Submit a REVIEW at a CAMPEntry
 router.post('/',isLoggedIn,validateReview, catchAsync(reviews.createReview))
  
  // Delete a particular REVIEW for a CAMP-USER
 router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

  module.exports = router; 
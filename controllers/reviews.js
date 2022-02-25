const Review = require('../models/review');
const Campground = require("../models/campground");

  // Submit a REVIEW at a CAMPEntry
module.exports.createReview = async(req,res)=>{
    const {id} =  req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id; 
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Created a new Review')
    res.redirect(`/campgrounds/${campground._id}`);
}


 // Delete a particular REVIEW for a CAMP-USER
module.exports.deleteReview = async(req,res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Deleted your REVIEW !')
    res.redirect(`/campgrounds/${id}`);
}
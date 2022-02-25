const Campground = require("../models/campground");
const { cloudinary } = require('../cloudinary')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const mapboxToken = process.env.MAPBOX_TOKEN; 
const geocoder = mbxGeocoding({accessToken: mapboxToken })

// Displays all the Campgrounds
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}

// To make/create a new Camp Entry/ Rendering Form for new Campgrounds
module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
}

// After FORM submission where the Data loads/ Creating Campgrounds and saving to DB
module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
      query: req.body.campground.location,
      limit: 1 
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground)
    req.flash('success','Successfully created a new Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

// Detials Page about each CampSite
module.exports.showCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
      path:'reviews',
      populate: {
        path: 'author'
      }
    }).populate('author');
    console.log(campground);
    if(!campground){
      req.flash('error','Campground Does Not Exists')
      return res.redirect('/campgrounds');
    }
    res.render("campgrounds/show", { campground });
}

// Render the FORM where we Edit a Campground Entry
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
      req.flash('error','Campground Does Not Exists')
      return res.redirect('/campgrounds');
    }
    
    res.render("campgrounds/edit", { campground });
}

// PUT request , Data after Update/Edit
module.exports.updatingCampground = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground});

    // let imgs = campground.images.map(fi => { console.log(fi.filename) })
    // console.log(imgs)
    
    // let images = req.files.map(fi => ({ url: fi.path, filename: fi.filename}));
    // campground.images.push(...images);
    await campground.save();
    if(req.body.deleteImages){
      for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename);
      }
      await campground.updateOne({$pull : {images : { filename: {$in : req.body.deleteImages }}}})
      console.log(campground)
    }
    req.flash('success','Successfully Updated a Campground')
    res.redirect(`/campgrounds/${campground._id}`);
}

// DELETE a CampEntry
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const deleteCampEntry = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted the CAMPGROUND')
    res.redirect("/campgrounds");
}
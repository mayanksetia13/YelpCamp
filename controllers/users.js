const User = require('../models/user');

// FORM render page to Create a new User
module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

// POST request submitting the New User
module.exports.register = async(req,res)=>{
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err); 
            req.flash("success","Welcome to Yelp Camp")
            res.redirect('/campgrounds');
        }) 
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect('register')
    }    
}

// Form render page to LOGIN a User
module.exports.renderLogin = (req,res)=>{
    res.render('users/login')
}

// POST requset after Users clicks on Login Button 
module.exports.loginPOST = (req,res)=>{
    req.flash('success','Welcome Back to YelpCamp')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

// Logout Request
module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success','Logged you Out')
    res.redirect('/campgrounds')
}
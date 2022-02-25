
# YelpCamp

This project is from a course called Web Developer Bootcamp by Colt Steele.

## Demo
See this app in action at https://boiling-shore-73491.herokuapp.com/


## Tech Stack

**Front-End:** Bootstrap

**Back-End:** Node, ExpressJS

**Databases:** MongoDB


## Screenshots

![App Screenshot](https://res.cloudinary.com/dzf98faah/image/upload/v1645780571/home_f5w0fj.png)

![App Screenshot](https://res.cloudinary.com/dzf98faah/image/upload/v1645783446/camps_hnh1gv.png)

![App Screenshot](https://res.cloudinary.com/dzf98faah/image/upload/v1645780576/Show-page_s5cd7l.png)



## Installation

Make sure you have these two things installed

- Node
- MongoDB   
        - Mlab (Alternative to downloading MongoDB locally) see the docs)


### Clone or Download this Repository 

```bash
git clone https://github.com/mayanksetia13/YelpCamp.git
```
after that run command
```bash
npm install
```
this will install all the necessary packages that you need to run the application.  

> *I've used dot.env to store the environment variable, So you need to create a .evn file once you clone or download the repo.*

paste below code into that file
```bash
# if you're using MLAB replace variable with your MLAB url
DATABASEURL = mongodb://localhost:27017/[your_database_name]   
```
## Features

* Authentication

    * Users can sign up or login using username and password.
    * User can not submit campgrounds if they are not logged in.



* Authorization

    * User can only modify campgrounds created by them.


* User Profile

    * Every registered user has profile where all his submitted campgrounds are shown.

* Basic Functionality

    * Add Name, Image and Description to the campground.
    *  Create, Update, Delete the Campground.
    * Add comments to campgrounds.
    * Flash Important messages to warn or gree the users.
    * Responsive Web design.

## Built With 

### FrontEnd
* Bootstrap
* Ejs

### BackEnd
* Node.js
* Express.js
* MongoDB
* mLAB
* mongoose
* passport
* passport-local
* express-session
* method-override
* connect-flash
* dotenv
* body-parser
* connect-mongo

##

Thanks for making this Journey Easier, a Big thanks to [Colt](https://github.com/Colt) for all the Lessons & Guidance.


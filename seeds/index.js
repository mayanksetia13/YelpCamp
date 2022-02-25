const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const randomSample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 15; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      images : [
        {
          url: 'https://res.cloudinary.com/dzf98faah/image/upload/v1645000076/Yelpcamp/tkxr1fz2kpi03puqethb.jpg',
          filename: 'Yelpcamp/tkxr1fz2kpi03puqethb',
        },
        {
          url: 'https://res.cloudinary.com/dzf98faah/image/upload/v1645000081/Yelpcamp/cxjdcmlywgazsqfisybv.jpg',
          filename: 'Yelpcamp/cxjdcmlywgazsqfisybv',
        }
      ],
      // images: await seedImg(),
      geometry: { 
        type : "Point", 
        coordinates : [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      author: '620a9f7e3f4df4d167009636',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${randomSample(descriptors)} ${randomSample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis ultricies neque. Vestibulum eget sodales tellus. Proin ante mauris, blandit ut lectus at, consectetur gravida nunc.",
      price: 20,
    });
    await camp.save();
  }
};

// call unsplash and return small image
// async function seedImg() {
//   try {
//     const resp = await axios.get("https://api.unsplash.com/photos/random", {
//       params: {
//         client_id: "6HnCMh8kCUXd5ZHHBeNyzR7QPqqFFJal32yhrHCkk-U",
//         collections: 429524,
//       },
//     });
//     return resp.data.urls.small;
//   } catch (err) {
//     console.error(err);
//   }
// }

seedDB().then(() => {
  mongoose.connection.close();
});

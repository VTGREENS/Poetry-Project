require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const homeAboutController = require("./controllers/home.about.controller");
const postPoemController = require("./controllers/post.poem.controller");
const worksDigitalController = require("./controllers/works.digital.controller");
const adminController = require ('./controllers/admin.controller');
const newsletterController = require('./controllers/newsletter.controller');
const worksPhysicalController = require('./controllers/works.physical.controller');
const sidebarRightController = require ('./controllers/sidebar.right.controller');


// ! Connect to the DB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

db.once("open", () => console.log("Connected to Poetry Project DB"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/about", homeAboutController);
app.use("/post", postPoemController);
app.use("/digital", worksDigitalController);
app.use('/admin', adminController);
app.use('/newsletter', newsletterController);
app.use('/physical', worksPhysicalController);
app.use('/sidebarright', sidebarRightController);

// If using validation method in app.js, do not use it in another controller or route. It is important to not have a validate method above the user controller. Best method is to validate each item individually and not globablly
// app.use(validateSession);

app.listen(process.env.PORT, function () {
  console.log(`Poetry App is listening on ${process.env.PORT}`);
});

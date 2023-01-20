const router = require("express").Router();
const HomeAbout = require("../models/home.about.model");

//! This allows admin to create content
router.post("/about/create", async (req, res) => {
  try {
    const homeAbout = new HomeAbout({
      aboutContentImage: req.body.aboutContentImage,
      aboutContentText: req.body.aboutContentText,
    });
    const newHomeAbout = await homeAbout.save();
    res.status(200).json({
      message: newHomeAbout,
      message: "Your content has been added",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! This allows admin to get content
router.get("/about/", async (req, res) => {
  try {
    const homeAbouts = await HomeAbout.find();
    res.json({ messages: homeAbouts, message: "success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! This allows admin to edit content
router.patch("about/update", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const homeAbout = await HomeAbout.findByIdAndUpdate(
      filter,
      update,
      returnOptions
    );

    res.json({
      message: homeAbout ? "Message updated" : "Message was not updated",
      message: homeAbout ? message : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

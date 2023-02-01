const router = require('express').Router();
const HomeAbout = require('../models/home.about.model');
const validateSesson = require('../middleware/validate-session');

//! This allows admin to create content
router.post('/create', validateSesson, async (req, res) => {
  try {
    const homeAbout = new HomeAbout({
      aboutContentImage: req.body.aboutContentImage,
      aboutContentText: req.body.aboutContentText,
    });
    const newHomeAbout = await homeAbout.save();
    res.status(200).json({
      homeAbout: newHomeAbout,
      message: 'Your content has been added',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! This allows admin to get content
router.get('/', async (req, res) => {
  try {
    const homeAbout = await HomeAbout.find();
    res.json({ homeAbout: homeAbout, message: 'success' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Get one
router.get('/:id', async (req, res) => {
  try {
    const homeAbout = await HomeAbout.findById({ _id: req.params.id });
    res.json({ homeAbout: homeAbout, message: 'Retrieved Post' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! This allows admin to edit content
router.put('/update/:id', validateSesson, async (req, res) => {
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
      message: homeAbout
        ? 'Home/About was updated'
        : 'Home/About was not updated',
      homeAbout: homeAbout ? homeAbout : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// ! Delete Home/About post
router.delete('/delete/:id', validateSesson, async (req, res) => {
  try {
    const homeAboutRecord = await HomeAbout.findById(req.params.id);

    if (!homeAboutRecord) throw new Error("Record Does Not Exist");

    const deletedHomeAbout = await HomeAbout.deleteOne({_id: req.params.id });
    res.json({
      deletedHomeAbout: deletedHomeAbout,
      message:
        deletedHomeAbout.deletedCount > 0
          ? 'About was deleted'
          : 'About was not deleted',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

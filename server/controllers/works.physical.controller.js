const router = require('express').Router();
const WorksPhysical = require('../models/works.physical.model');
const validateSession = require('../middleware/validate-session');


// Create Physical Works Post
router.post('/create', validateSession, async (req, res) => {
  try {
    const worksPhysical = new WorksPhysical({
      image: req.body.image,
      imageAltText: req.body.imageAltText,
      title: req.body.title,
      attribution: req.body.attribution,
      description: req.body.description,
      msrp: req.body.msrp,
      amazonLink: req.body.amazonLink,
      unsolicitedPressLink: req.body.unsolicitedPressLink,
      barnesAndNobleLink: req.body.barnesAndNobleLink,
      signedPrice: req.body.signedPrice,
      signedLink: req.body.signedLink,
    });

    // Save Physical Works
    const newWorksPhysical = await worksPhysical.save();

    res.json({
      worksPhysical: newWorksPhysical,
      message: 'Physical Works Created',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Update Physical Works
router.put('/update/:id', validateSession, async (req, res) => {
  try {
    const filter = {
      _id: req.params.id,
    };

    const update = req.body;
    const updated = { new: true };
    const workPhysical = await WorksPhysical.findOneAndUpdate(
      filter,
      update,
      updated
    );

    res.json({
      message: workPhysical
        ? 'Physical Work Info Updated'
        : 'Physical Work Not Updated',
      workPhysical: workPhysical ? workPhysical : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete Physical Works
router.delete('/delete/:id', validateSession, async (req, res) => {
  try {
    const deletedWorkPhysical = await WorksPhysical.deleteOne({
      _id: req.params.id,
    });

    res.json({
      deletedWorkPhysical: deletedWorkPhysical,
      message:
        deletedWorkPhysical.deletedCount > 0
          ? 'Physical Works Deleted'
          : 'Physical Works Not Found',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get All
router.get('/', async (req, res) => {
  try {
    const worksPhysical = await WorksPhysical.find();
    res.json({
      worksPhysical: worksPhysical,
      message: 'Retrieved Physical Works',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get One
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const workPhysical = await WorksPhysical.findById({ _id: req.params.id });
    res.json({
      workPhysical: workPhysical,
      message: 'Retrieved Physical Work',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

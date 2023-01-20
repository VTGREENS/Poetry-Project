const router = require('express').Router();
const WorksPhysical = require('../models/works.physical.model');

// Create Physical Works Post
router.post('/create', async (req, res) => {
  console.log('physical works create');
  try {
    const worksPhysical = new WorksPhysical({
      image: req.body.image,
      imageAltText: req.body.imageAltText,  
      title: req.body.title,
      msrp: req.body.msrp,
      links: req.body.links,
      signedPrice: req.body.signedPrice,
      linkSigned: req.body.linkSigned,
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
router.put('/update/:id', async (req, res) => {
  try {
    let filter = {
      _id: req.params.id,
    };

    let update = req.body;
    let updated = { new: true };
    let worksPhysical = await WorksPhysical.findOneAndUpdate(
      filter,
      update,
      updated
    );

    res.json({
      message: worksPhysical
        ? 'Physical Works Info Updated'
        : 'Physical Works Not Updated',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete Physical Works
router.delete('/:id', async (req, res) => {
  try {
    let deletedWorksPhysical = await WorksPhysical.deleteOne({
      _id: req.params.id,
    });

    res.json({
      deletedWorksPhysical: deletedWorksPhysical,
      message:
        deletedWorksPhysical.deleteCount > 0
          ? 'Physical Works Deleted'
          : 'Physical Works Not Found',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

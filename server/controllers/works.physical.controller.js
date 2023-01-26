const router = require('express').Router();
const WorksPhysical = require('../models/works.physical.model');
const validateSession = require ('../middleware/validate-session');

// Create Physical Works Post
router.post('/create', validateSession, async (req, res) => {
  
  try {
    const worksPhysical = new WorksPhysical({
      image: req.body.image,
      imageAltText: req.body.imageAltText,  
      title: req.body.title,
      description: req.body.title,
      msrp: req.body.msrp,
      linkAmazon: req.body.linkAmazon,
      linkUP: req.body.linkUP,
      linkBaN: req.body.linkBaN,
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
router.put('/update/:id', validateSession, async (req, res) => {
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
router.delete('/delete/:id', validateSession, async (req, res) => {
  try {
    let deletedWorksPhysical = await WorksPhysical.deleteOne({
      _id: req.params.id,
    });

    res.json({
      deletedWorksPhysical: deletedWorksPhysical,
      message:
        deletedWorksPhysical.deletedCount > 0
          ? 'Physical Works Deleted'
          : 'Physical Works Not Found',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get All
router.get("/", async (req, res) => {
try {
  const worksPhysical = await WorksPhysical.find();
  res.json({ messages: worksPhysical, message:"Retrieved Physical works" });

} catch (error) {
  res.json({ message: error.message })
}
});

// Get One
router.get("/:id", async (req, res) =>{
  try {
    const workPhysical = await WorksPhysical.findById({ _id:req.params.id });
    res.json({ messages: workPhysical, message: "Retrieved Physical Work"})
  } catch (error) {
    res.json({ message: error.message });
  }
})


module.exports = router;

const router = require("express").Router();
const Gallery = require("../models/gallery.model");
const validateSession = require("../middleware/validate-session")

//! Allows admin to add new digital work
router.post("/create", validateSession, async (req, res) => {
  try {
    const gallery = new Gallery({
      imageURL: req.body.imageURL,
      altImageText: req.body.altImageText,
      attribution: req.body.attribution,
      description: req.body.description,
    });
    const newGallery = await gallery.save();
    res.status(200).json({
      gallery: newGallery,
      message: "Your Gallery Post has been added",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Allows admin to view all digital works
router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json({ gallery: gallery, message: "Retrieved Gallery Posts." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to view one Digital Work
router.get("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findById({ _id: req.params.id });
    res.json({ gallery: gallery, message: "Retrieved Gallery Post." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to update Digital Work
router.put("/update/:id", validateSession, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const gallery = await Gallery.findByIdAndUpdate(
      filter,
      update,
      returnOptions
    );

    res.json({
      message: gallery
        ? "Gallery Post updated"
        : "Gallery Post was not updated",
      
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to delete a Digital Work
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    const galleryRecord = await Gallery.findById(req.params.id);

    if (!galleryRecord) throw new Error("Record Does Not Exist");

    const deletedGallery = await Gallery.deleteOne({
      _id: req.params.id,
    });
    res.json({
      deletedGallery: deletedGallery,
      message:
        deletedGallery.deletedCount > 0
          ? "Gallery Post was deleted"
          : "Gallery Post was not deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

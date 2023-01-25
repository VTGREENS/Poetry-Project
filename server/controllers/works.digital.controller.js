const router = require("express").Router();
const WorksDigital = require("../models/works.digital.model");
const validateSession = require("../middleware/validate-session")

//! Allows admin to add new digital work
router.post("/create", async (req, res) => {
  try {
    const worksDigital = new WorksDigital({
      title: req.body.title,
      linkUrl: req.body.linkUrl,
      imageUrl: req.body.imageUrl,
    });
    const newWorksDigital = await worksDigital.save();
    res.status(200).json({
      message: newWorksDigital,
      message: "Your Digital Work has been added",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Allows admin to view all digital works
router.get("/", async (req, res) => {
  try {
    const worksDigital = await WorksDigital.find();
    res.json({ messages: worksDigital, message: "Retrieved Digital Works." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to view one Digital Work
router.get("/:id", async (req, res) => {
  try {
    const worksDigital = await WorksDigital.findById({ _id: req.params.id });
    res.json({ messages: worksDigital, message: "Retrieved Digital Work." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to update Digital Work
router.put("/update/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const worksDigital = await WorksDigital.findByIdAndUpdate(
      filter,
      update,
      returnOptions
    );

    res.json({
      message: worksDigital
        ? "Digital Work updated"
        : "Digital Work was not updated",
      
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to delete a Digital Work
router.delete("/delete/:id", async (req, res) => {
  try {
    const worksDigitalRecord = await WorksDigital.findById(req.params.id);

    if (!worksDigitalRecord) throw new Error("Record Does Not Exist");

    const deletedWorksDigital = await WorksDigital.deleteOne({
      _id: req.params.id,
    });
    res.json({
      deletedWorksDigital: deletedWorksDigital,
      message:
        deletedWorksDigital.deletedCount > 0
          ? "Digital Work was deleted"
          : "Digital Work was not deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

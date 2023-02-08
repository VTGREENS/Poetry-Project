const router = require('express').Router();
const Newsletter = require('../models/newsletter.model');


// Create Newsletter Recipient
router.post('/signup', async (req, res) => {
  console.log('newsletter signup');
  try {
    const newsletter = new Newsletter({
      email: req.body.email,
    });

    // Save Email
    const newNewsletter = await newsletter.save();

    res.json({
      newsletter: newNewsletter,
      message: 'Newsletter Signup Successful!',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const newsletter = await Newsletter.find();
    res.json({ newsletter: newsletter, message: "Retrieved Emails." });
  } catch (error) {
    res.json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const newsletter = await Newsletter.findById({ _id: req.params.id });
    res.json({ newsletter: newsletter, message: "Retrieved Email." });
  } catch (error) {
    res.json({ message: error.message });
  }
});


// Delete Recipient Email from Newsletter list
router.delete('/delete/:id', async (req, res) => {
  try {
    let deletedNewsletter = await Newsletter.deleteOne({
      _id: req.params.id,
    });

    res.json({
      deletedNewsletter: deletedNewsletter,
      message:
        deletedNewsletter.deletedCount > 0
          ? 'Recipient will no longer receive Newsletter'
          : 'Recipient Email Addess not found',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

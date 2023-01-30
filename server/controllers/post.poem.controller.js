const router = require("express").Router();
const PostPoem = require("../models/post.poem.model");
const validateSession = require('../middleware/validate-session');

//! Allows admin to add a new post/poem
router.post("/create", validateSession, async (req, res) => {
  try {
    const postPoem = new PostPoem({
      title: req.body.title,
      attribution: req.body.attribution,
      date: req.body.date,
      body: req.body.body,
      publishedLink: req.body.publishedLink,
      buyLink: req.body.buyLink,
      imageLink: req.body.imageLink
    });
    const newPostPoem = await postPoem.save();
    res.status(200).json({
      postPoem: newPostPoem,
      message: "Your poem has been posted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Allows admin to view all posts/poems
router.get("/", async (req, res) => {
  try {
    const postPoems = await PostPoem.find();
    res.json({ postPoems: postPoems, message: "Retrieved Posts." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to view one post/poem
router.get("/:id", async (req, res) => {
  try {
    const postPoem = await PostPoem.findById({ _id: req.params.id });
    res.json({ postPoem: postPoem, message: "Retrieved Post." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to update post/poem
router.put("/update/:id", validateSession, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const postPoem = await PostPoem.findByIdAndUpdate(
      filter,
      update,
      returnOptions
    );

    res.json({
      message: postPoem 
      ? "Post/Poem updated" 
      : "Post/Poem was not updated",
      postPoem: postPoem ? postPoem : {},
      
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to delete a post/poem
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    const postPoemRecord = await PostPoem.findById(req.params.id);

    if (!postPoemRecord) throw new Error("Record Does Not Exist");

    const deletedPostPoem = await PostPoem.deleteOne({ _id: req.params.id });
    res.json({
      deletedPostPoem: deletedPostPoem,
      message:
        deletedPostPoem.deletedCount > 0
          ? "Post/Poem was deleted"
          : "Post/Poem was not deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

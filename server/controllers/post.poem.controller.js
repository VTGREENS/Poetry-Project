const router = require("express").Router();
const PostPoem = require("../models/post.poem.model");

//! Allows admin to add a new post/poem
router.post("/create", async (req, res) => {
  try {
    const postPoem = new PostPoem({
      title: req.body.title,
      author: req.body.author,
      date: req.body.date,
      body: req.body.body,
      linkPublished: req.body.linkPublished,
      linkBuy: req.body.linkBuy,
    });
    const newPostPoem = await postPoem.save();
    res.status(200).json({
      message: newPostPoem,
      message: "Your post has been added",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//! Allows admin to view all posts/poems
router.get("/", async (req, res) => {
  try {
    const postPoems = await PostPoem.find();
    res.json({ messages: postPoems, message: "Retrieved Posts/Poems." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to view one post/poem
router.get("/:id", async (req, res) => {
  try {
    const postPoem = await PostPoem.findById({ _id: req.params.id });
    res.json({ postPoem: postPoem, message: "Retrieved Post/Poem." });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to update post/poem
router.put("/update/:id", async (req, res) => {
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
      message: postPoem ? "Post/Poem updated" : "Post/Poem was not updated",
      
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//! Allows admin to delete a post/poem
router.delete("/delete/:id", async (req, res) => {
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
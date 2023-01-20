const router = require('express').Router();
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// ! Validate Session needed here

// Create New Admin
router.post('/signup', async (req, res) => {
  console.log('signup');
  try {
    const admin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin,
    });
    // Save Admin
    const newAdmin = await admin.save();
    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 72,
    });

    res.json({
      admin: newAdmin,
      message: 'Admin created!',
      token: token,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Admin Log in
router.post('/login', async (req, res) => {
  try {
    // Match Email
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      throw new Error('Admin not found');
    }
    //  Match Password
    let passwordMatch = await bcrypt.compare(req.body.password, admin.password);

    if (!passwordMatch) {
      throw new Error('password is incorrect');
    }
    // Create login token
    let token = jwt.sign({ id: admin._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 72,
    });
    res.json({ admin: admin, message: 'success', token: token });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Update Admin
// ! Needs Validate Session Middleware
router.put('/update/:id', async (req, res) => {
  try {
    let filter = {
      _id: req.params.id,
    };
    let update = req.body;
    let updated = { new: true };
    let admin = await Admin.findOneAndUpdate(filter, update, updated);

    res.json({
      message: admin ? 'admin info updated' : "owner id doesn't match",
      message: admin ? admin : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete Admin
// ! Needs Validate Session Middleware
router.delete('/:id', async (req, res) => {
  try {
    const adminRecord = await Admin.findById(req.params.id);
    const isValidOwner = req.admin._id == adminRecord.id;

    // Validate Owner
    if (!isValidOwner) {
      throw new error(
        "The Id supplied for the Admin record is not owned by this user. Admin wasn't deleted"
      );
    }

    let deletedAdmin = await Admin.deleteOne({
      _id: req.params.id,
    });

    res.json({
      deletedAdmin: deletedAdmin,
      message:
        deletedAdmin.deleteCount > 0 ? 'Admin deleted' : 'Admin was not found',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

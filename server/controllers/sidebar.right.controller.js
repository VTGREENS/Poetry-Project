const router = require('express').Router();
const SidebarRight = require('../models/sidebar.right.model')
const validateSession = require('../middleware/validate-session');

// Create SidebarRight Post
router.post('/create', validateSession, async (req,res) =>
{
    try {
        const sidebarRight = new SidebarRight({
            image: req.body.image,
            imageAltText: req.body.imageAltText,
            excerpt: req.body.excerpt,
            infoLink: req.body.infoLink,
        });

        // Save SidebarRight Post
        const newSidebarRight = await sidebarRight.save();

        res.json({
            sidebarRight: newSidebarRight,
            message: 'Content Created'
        });
        
    } catch (error) {
        res.json({message: error.message});
    }
});

// Update SidebarRight Post
router.put('/update/:id', validateSession, async (req,res) => {
    try {
        const filter = {
            _id: req.params.id,
        };

        const update = req.body;
        const updated = { new: true };
        const sidebarRight = await SidebarRight.findOneAndUpdate(
            filter,
            update,
            updated,
        );

        res.json({
            message: sidebarRight
            ? 'Sidebar Card Updated'
            : 'Sidebar Card Not Updated',
            sidebarRight: sidebarRight ? sidebarRight : {}
        });
    } catch (error) {
        res.json({message: error.message});
    }
});

// Delete SidebarRight Post
router.delete('/delete/:id', validateSession, async (req, res) => {
    try {
        const deletedSidebarRight = await SidebarRight.deleteOne({
            _id: req.params.id,
        });

        res.json({
            deletedSidebarRight: deletedSidebarRight,
            message:
            deletedSidebarRight.deletedCount > 0
            ? 'Sidebar Content Deleted'
            : 'Sidebar Content Not Found',
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Get All
router.get('/', async (req, res) => {
    try{
        const sidebarRight = await SidebarRight.find();
        res.json({
            sidebarRight: sidebarRight,
            message: 'Retrieved Sidebar Content'
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

//Get One
router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const sidebarRight = await SidebarRight.findById({
            _id: req.params.id });
            res.json({
                sidebarRight: sidebarRight,
                message: 'Retrieved Sidebar Content',
            });
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;

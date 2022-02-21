const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Notes');



// Route 1: Get all notes details using: Get "/api/fetchallnotes". no login require
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    const notes = await Note.find({user:req.user.id})
    res.json(notes)
})

module.exports = router;
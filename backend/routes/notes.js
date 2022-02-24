const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require('../models/Note');



// Route 1: Get all notes details using: Get "/api/notes/fetchallnotes". login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

// Route 2: Add a new Note using: Post "/api/notes/addnote". login require
router.post('/addnote', fetchuser, [
    body("title", "enter a valid name").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

// Route 3: Update an existing note using: Put "/api/notes/updatenote/:id". login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //creaye newNote object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // find the note to be updated to update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) //note will be update
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})



// Route 4: Delete an existing note using: DELETe "/api/notes/deletenote/:id". login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleteted to delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id) //note will be update
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})
module.exports = router;
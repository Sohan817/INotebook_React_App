const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");
const User = require("../models/User");

//Route 1: Get All the using: get "api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find(req.body.id);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route 2:Add notes using: post "api/notes/addnote".Login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        // @ts-ignore
        user: user_data.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
module.exports = router;

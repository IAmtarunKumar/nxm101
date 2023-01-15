const express = require("express");
// const jwt = require("jsonwebtoken");
const cors = require('cors')

const { NoteModel } = require("../model/note.model");
// const app = express();
// app.use(express.json());

const notesRouter = express.Router();
notesRouter.use(cors())
notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send("New Note is created");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
});

notesRouter.get("/all", async (req, res) => {
  try {
    const alldata = await NoteModel.find();
    res.send(alldata);
  } catch (error) {
    res.send("Something went wrong in show notes");
    console.log(error);
  }
});

notesRouter.patch("/update/:id", async (req, res) => {
  const paramdata = req.params.id;
  const payload = req.body
  // console.log(paramdata);
  // console.log(payload)

  const making_req = req.body.userID
  console.log(making_req)

  const note = await NoteModel.findOne({_id : paramdata})
  const userID_in_note = note.userID
  // console.log(userID_in_note+"x")


  try {

    if(making_req === userID_in_note){

    await NoteModel.findByIdAndUpdate({ _id: paramdata },payload);
    res.send("Updated");
    }else{
      res.send("you are not authorized")
    }
  } catch (error) {
    res.send("something went wrong in update note");
    console.log(error);
  }
});

notesRouter.delete("/delete/:id", async (req, res) => {
  const paramdata = req.params.id;
  console.log(paramdata);

  const note = await NoteModel.findOne({_id : paramdata})
  const userID_in_note = note.userID

  const making_req = req.body.userID
  console.log(making_req)


  try {
    if(userID_in_note===making_req){
    await NoteModel.findByIdAndDelete({ _id: paramdata });
    res.send("delete");
    }else{
      res.send("User not Authrized")
    }
  } catch (error) {
    res.send("something went wrong in delete data");
    console.log(error);
  }
});

module.exports = {
  notesRouter,
};

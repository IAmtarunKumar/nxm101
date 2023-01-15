const mongoose = require('mongoose')

//schema
const noteSchema = mongoose.Schema({
    title:String,
    note : String,
    userID : String
})

//Model 
const NoteModel = mongoose.model("note",noteSchema)


module.exports={
    NoteModel
}
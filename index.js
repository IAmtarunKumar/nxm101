const express = require("express");
require("dotenv").config();
const { connection } = require("./configs/db");
const { uesrRouter } = require("./routes/user.route");
const { notesRouter } = require("./routes/note.route");
const { authentication } = require("./configs/Middleware/authentication");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("home page");
});

// users routes
app.use("/users", uesrRouter);
//notes router
app.use(authentication);
app.use("/notes", notesRouter);




app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`${process.env.port} is working`);
  } catch (error) {
    console.log(error);
    console.log("DB is not connected");
  }
});

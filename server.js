
const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http").Server(app);
const io = require("socket.io");
const Chat = require("./models/Chat");

const PORT = process.env.PORT || 3000;

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost/chat", { useNewUrlParser: true });

//bodyparser middleware
app.use(bodyParser.json());

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//integrating socketio
socket = io(http);

http.listen(PORT, () => {
  console.log("Server listening on Port: " + PORT);
});
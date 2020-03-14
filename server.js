const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http").Server(app);
const io = require("socket.io");
const Chat = require("./models/Chat");
const chatRouter = require("./routes/chat");

const PORT = process.env.PORT || 3000;

// configure bodyparser middleware
app.use(bodyParser.json());

// routes
app.use("/chats", chatRouter);

// set app to static 
app.use(express.static(__dirname + "/public"));

// integrating socketio
socket = io(http);

// connecting to DB
const connect = require("./dbconnect");

// User connected msg
socket.on("connection", socket => {
    console.log("user connected");

    socket.on("disconnect", function () {
        console.log("user disconnected");
    });

    // Typing notification
    socket.on("typing", data => {
        socket.broadcast.emit("notifyTyping", {
            user: data.user,
            message: data.message
        });
    });

    // User stops typing msg
    socket.on("stopTyping", () => {
        socket.broadcast.emit("notifyStopTyping");
    });

    socket.on("chat message", function (msg) {
        console.log("message: " + msg);

        // Broadcast to other users on server
        socket.broadcast.emit("received", { message: msg });

        // Save chat to DB
        connect.then(db => {
            console.log("connected to the server");
            let chatMessage = new Chat({ message: msg, sender: "Anonymous" });

            chatMessage.save();
        });
    });
});

http.listen(PORT, () => {
    console.log("Server listening on Port: " + PORT);
});
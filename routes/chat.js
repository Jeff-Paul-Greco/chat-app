const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("../dbconnection");
const Chat = require("../models/Chat");

const router = express.Router();

router.route("/").get((req, res, next) => {

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    connectdb.then(db => {

        let data = Chat.find({ message: "Anonymous" });
        Chat.find({}).then(chat => {
            res.json(chat);
        });

    });
});

module.exports = router;
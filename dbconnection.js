const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chat";
const connect = mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = connect;
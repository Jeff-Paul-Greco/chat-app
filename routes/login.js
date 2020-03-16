const express = require("express");
const router = express.Router();

router.route("/").post((req, res) => {
    username = localStorage.setItem("user", req.body.username)
        .then(function (username) {

            res.json(username);
        })
        .catch(function (err) {

            res.json(err);
        });
});

module.exports = router;
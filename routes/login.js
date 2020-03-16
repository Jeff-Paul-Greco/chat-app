const express = require("express");
const router = express.Router();

router.route("/").post((req, res) => {
    username = localStorage.setItem("user", req.body.username);
    // console.log(req.body)
    res.redirect("/")
});

module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/test"), ((req, res) => {
    req.json({ msg: "This is the tweet route"});
});

module.exports = router;
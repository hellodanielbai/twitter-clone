const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = express.Router();
const passport = require("passport")
const validateTweetInput = require("../../validation/tweets")

router.get("/test"), ((req, res) => {
    req.json({ msg: "This is the tweet route"});
});

router.get("/", (req, res) => {
    Tweet
        .find()
        sort({ date: -1})
        .then(tweet => res.json(tweet))
        .catch(err => res.status(400).json(err))
});

router.get("/user/:user_id", (req, res) => {
    Tweet
        .find({ user: req.params.user_id })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json(err))
});

router.get("/:id", (req, res) => {
    Tweet 
        .findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err => res.status(400).json(err))
});


router.post("/", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateTweetInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }
    
        const newTweet = newTweet({
            user: req.user.id,
            text: req.body.text
        })

        newTweet
            .save()
            .then(tweet => res.json(tweet))
    }
);

module.exports = router;
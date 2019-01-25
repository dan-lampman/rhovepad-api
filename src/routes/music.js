const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const rhovepad = require('./../services/rhovepad');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',  ({}, res) => {
    rhovepad.getMusic().then((response) => {
        res.status(200).send(response)

    })
});

module.exports = router;
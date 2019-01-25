const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const scripts = require('./../scripts');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/init', (req, res) => {
    const promises = [scripts.generateFollowers(), scripts.generateListens()];

    Promise.all(promises).then((response) => {
        const message = 'Successfully initialized data';
        res.status(200).send(message)

    }).catch((error) => {
        res.status(500).send(error);
    })
});

module.exports = router;

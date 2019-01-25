const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const rhovepad = require('../services/rhovepad');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/viewAll',  (req, res) => {
    rhovepad.getUsers().then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
});

router.get('/:userID',  (req, res) => {
    const userID = req.params.userID;

    rhovepad.getUser(userID).then((response) => {
        res.status(200).send(response);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
});

router.get('/:userID/recommendations',  (req, res) => {
    const userID = req.params.userID;

    rhovepad.getRecommendations(userID).then((response) => {
        res.status(200).send(response);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
});

router.post('/follow',  (req, res) => {
    const fromID = req.body.from || null;
    const toID = req.body.to || null;

    rhovepad.follow(fromID, toID).then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
});

router.post('/listen',  (req, res) => {
    const userID = req.body.user || null;
    const musicID = req.body.music || null;

    rhovepad.listen(userID, musicID).then((response) => {
        res.status(200).send(response);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
});


module.exports = router;
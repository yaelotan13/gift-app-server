const express = require('express');

const usersController = require('../../controllers/users');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('got request to post users');
    const status = await usersController.logIn(req.body.token);
    res.sendStatus(status);
})

module.exports = router;
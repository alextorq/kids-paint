const express         = require('express');
const appRoot         = require('app-root-path');
const log4js          = require(appRoot + '/logger');
const mongoose        = require(appRoot + '/db/connection');
const router          = express.Router();
const Pic           = require(appRoot + '/db/models/picture');

const logger = log4js.getLogger('cheese');


function errorHandler(err, response) {
    console.log(err);
    response.sendStatus(500);
    logger.error(err);
}

//Отдаем весь список
router.get('/all',  async function (request, response) {
    try {
        let results = await Pic.find();
        response.send(results);
    }catch (err) {
        errorHandler(err, response);
    }
});


router.post('/new',  async function (request, response) {
    try {
        let results = await Pic.create(request.body);
        response.send(results);
    }catch (err) {
        errorHandler(err, response);
    }
});

module.exports = router;

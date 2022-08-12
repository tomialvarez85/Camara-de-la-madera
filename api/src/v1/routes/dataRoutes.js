const express = require('express');
const router = express.Router();
const dataController = require('../../controllers/dataController');

router
    .post('/data' , dataController.createData);


module.exports = router;
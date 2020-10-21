const controller = require('../../controllers/api');
const express = require('express');

const router = express.Router();

router.post('/fetch-sector', controller.updateSector);

router.post('/fetch-prices', controller.updateSector);

router.post('/fetch-trades', controller.postTrades);

module.exports = router;
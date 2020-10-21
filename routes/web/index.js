const controller = require('../../controllers/web');
const express = require('express');

const router = express.Router();

router.get('/', controller.postData);

module.exports = router;
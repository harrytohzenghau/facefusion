const express = require('express');
const SamplesController = require('../controllers/SamplesController');
const router = express.Router();

router.get('/', SamplesController.getSamples);

module.exports = router;

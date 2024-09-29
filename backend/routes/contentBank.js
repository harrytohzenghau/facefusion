const express = require('express');
const router = express.Router();
const ContentBankController = require('../controllers/ContentBankController');

// Routes
router.get('/', ContentBankController.getAllContent);
router.get('/:id', ContentBankController.getContentById);
router.post('/', ContentBankController.createContent);
router.put('/:id', ContentBankController.updateContent);
router.delete('/:id', ContentBankController.deleteContent);

module.exports = router;
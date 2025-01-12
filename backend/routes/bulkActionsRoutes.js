const express = require('express');
const router = express.Router();
const bulkActionsController = require('../controllers/bulkActionsController');

// Bulk Actions routes
router.post('/approve', bulkActionsController.approveSelectedUsers);
router.post('/delete', bulkActionsController.deleteSelectedPosts);

module.exports = router;

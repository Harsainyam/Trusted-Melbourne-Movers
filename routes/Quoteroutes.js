const express = require('express');
const router = express.Router();
const {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
} = require('../controllers/quoteController');

// Public
router.post('/', createQuote);

// Admin (protect these with auth middleware in production)
router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.patch('/:id/status', updateQuoteStatus);
router.delete('/:id', deleteQuote);

module.exports = router;
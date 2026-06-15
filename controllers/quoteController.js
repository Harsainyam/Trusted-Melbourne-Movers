const Quote = require('../models/Quote');

// ─── CREATE — POST /api/quotes ───────────────────────────────────────────────
const createQuote = async (req, res) => {
  try {
    const { name, phone, email, movingFrom, movingTo, moveDate, homeSize, notes } = req.body;

    const quote = await Quote.create({
      name,
      phone,
      email,
      movingFrom,
      movingTo,
      moveDate,
      homeSize,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Quote request received! We will contact you shortly.',
      data: quote,
    });
  } catch (error) {
    // Mongoose validation errors → 400, everything else → 500
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('createQuote error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ─── GET ALL — GET /api/quotes ───────────────────────────────────────────────
const getAllQuotes = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [quotes, total] = await Promise.all([
      Quote.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Quote.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: quotes,
    });
  } catch (error) {
    console.error('getAllQuotes error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ─── GET ONE — GET /api/quotes/:id ──────────────────────────────────────────
const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found.' });

    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    console.error('getQuoteById error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ─── UPDATE STATUS — PATCH /api/quotes/:id/status ───────────────────────────
const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'booked', 'completed', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found.' });

    res.status(200).json({ success: true, message: 'Status updated.', data: quote });
  } catch (error) {
    console.error('updateQuoteStatus error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ─── DELETE — DELETE /api/quotes/:id ────────────────────────────────────────
const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found.' });

    res.status(200).json({ success: true, message: 'Quote deleted.' });
  } catch (error) {
    console.error('deleteQuote error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { createQuote, getAllQuotes, getQuoteById, updateQuoteStatus, deleteQuote };
const ContentBank = require('../models/ContentBank'); // Assuming ContentBank is where samples are stored

const SamplesController = {
  // Fetch sample data
  async getSamples(req, res) {
    try {
      const samples = await ContentBank.find({ is_sample: true }); // fetchSamples()
      res.json(samples);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = SamplesController;

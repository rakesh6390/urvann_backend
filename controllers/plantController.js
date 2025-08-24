const Plant = require('../models/Plant');

// Get all plants with search/filter
const getPlants = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      filter.categories = { $in: [category] };
    }

    const plants = await Plant.find(filter);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlants };
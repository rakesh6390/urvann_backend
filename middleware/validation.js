const validatePlant = (req, res, next) => {
  const { name, price, categories } = req.body;

  if (!name || !price || !categories) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  next();
};

module.exports = { validatePlant };
const express = require('express');
const { loginAdmin, addPlant } = require('../controllers/adminController');
const { validatePlant } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/plants', protect, validatePlant, addPlant);

module.exports = router;
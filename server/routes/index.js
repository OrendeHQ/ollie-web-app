const router = require('express').Router();
const userRoutes = require('./user');
const seriesRoutes = require('./series');
const itemRoutes = require('./item');

router.use('/api/user', userRoutes);
router.use('/api/series', seriesRoutes);
router.use('/api/item', itemRoutes);

module.exports = router;

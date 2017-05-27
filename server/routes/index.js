const router = require('express').Router();
const userRoutes = require('./user');
const seriesRoutes = require('./series');

router.use('/api/user', userRoutes);
router.use('/api/series', seriesRoutes);

module.exports = router;

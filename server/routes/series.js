const router = require('express').Router();
const seriesApi = require('../api/series');
const adminAuth = require('../middlewares/adminAuth');

router.post('/', adminAuth, seriesApi.createNewSeries);
router.put('/', adminAuth, seriesApi.editSeries);
router.delete('/:id', adminAuth, seriesApi.deleteSeries);
router.get('/all', seriesApi.getAllSeries);

module.exports = router;

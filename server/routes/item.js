const router = require('express').Router();
const itemApi = require('../api/item');
const adminAuth = require('../middlewares/adminAuth');
const upload = require('../middlewares/upload');

router.post('/', adminAuth, upload.single('picture'), itemApi.createNewItem);
router.put('/', adminAuth, upload.single('picture'), itemApi.editItem);
router.delete('/:id', adminAuth, itemApi.deleteItem);
router.get('/:series_id', itemApi.getItemOfSeries);

module.exports = router;

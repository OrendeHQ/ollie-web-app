const router = require('express').Router();
const userApi = require('../api/user');
const userAuth = require('../middlewares/userAuth');

router.post('/register', userApi.register);
router.post('/login', userApi.login);
router.get('/me', userAuth, userApi.getMyInfo);

module.exports = router;

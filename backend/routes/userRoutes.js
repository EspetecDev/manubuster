const express = require('express');
const router = express.Router();
const cors = require('cors');
const {registerUser, loginUser, getMe, recoverPassword, checkAndResetPassword} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.route('/login').post(cors(), loginUser);
router.route('/').post(cors(), registerUser);
router.route('/me').get(cors(), getMe);
router.route('/recoverPassword').post(cors(), recoverPassword);
router.route('/recoverPassword/:token').post(cors(), checkAndResetPassword);


module.exports = router;
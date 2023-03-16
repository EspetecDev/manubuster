const express = require('express');
const router = express.Router();
const {getGames, getUserGames, setGame, updateGame, deleteGame, reserveGame, returnGame, getReservedGames} = require('../controllers/gameController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getGames).post(protect, setGame);
router.route('/userGames').get(protect, getUserGames).put(protect, updateGame).delete(protect, deleteGame);
router.route('/reserve').get(protect, getReservedGames).put(protect, returnGame).post(protect, reserveGame);
module.exports = router
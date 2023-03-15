const express = require('express');
const router = express.Router();
const {getGames, getUserGames, setGame, updateGame, deleteGame} = require('../controllers/gameController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getGames).post(protect, setGame);
router.route('/:id').get(protect, getUserGames).put(protect, updateGame).delete(protect, deleteGame);

module.exports = router
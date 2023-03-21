const express = require('express');
const cors = require('cors');
const router = express.Router();
const {getGames, getUserGames, setGame, updateGame, deleteGame, reserveGame, returnGame, getReservedGames, getGameCover} = require('../controllers/gameController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(cors(), getGames);
router.route('/userGames').get(cors(), protect, getUserGames).post(cors(), protect, setGame).put(cors(), protect, updateGame).delete(cors(), protect, deleteGame);
router.route('/reserve').get(cors(), protect, getReservedGames).put(cors(), protect, returnGame).post(cors(), protect, reserveGame);
router.route('/cover').get(cors(), getGameCover);
module.exports = router
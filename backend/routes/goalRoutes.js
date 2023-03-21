const express = require('express');
const router = express.Router();
const cors = require('cors');
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

// router.get('/', getGoals);
// router.post('/', setGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
router.route('/').get(cors(), protect, getGoals).post(cors(), protect, setGoal);
router.route('/:id').put(cors(), protect, updateGoal).delete(cors(), protect, deleteGoal);

module.exports = router
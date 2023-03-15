const asyncHandler = require('express-async-handler');
const Game = require('../models/gameModel');
const User = require('../models/userModel');
const axios = require('axios');
const { set } = require('mongoose');

async function GetImageByGame(gameName) {
    try {
        const image = await axios.get('https://i.imgur.com/VMUUoOU.jpeg');
        return image.status == 200 ? image.data : undefined;
    } catch (e) {
        console.log(e);
    }
}

// @desc Get all games
// @route GET /api/games
// @access Public
const getGames = asyncHandler(async (req, res) => {
    // get all games
    const games = await Game.find();
    res.status(200).json({games});
});

// @desc Get user reserved games
// @route GET /api/games
// @access Public
const getUserGames = asyncHandler(async (req, res) => {
    // get all games
    if(!req.user.id)
    {
        res.status(400);
        throw new Error('userId required');
    }
    const goals = await Goal.find({owner: req.user.id })
    res.status(200).json({userGoals});
});

// @desc Set game
// @route POST /api/games
// @access Private
const setGame = asyncHandler(async (req, res) => {
    // need at least: name, platform, owner
    if(!req.body.name || !req.body.platform || !req.body.owner ){
        res.status(400);
        throw new Error('Please add at least a name, a platorm and a owner');
    }

    const owner = await User.find({name: req.body.owner});
    const cover = await GetImageByGame(req.body.name);
    const game = await Game.create({
        name: req.body.name,
        platform: req.body.platform,
        owner: owner.id
    });

    res.status(200).json(game);
});

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGame = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('goal not found');
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    // make sure that the logged user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,});
    res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGame = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('goal not found');
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    // make sure that the logged user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized');
    }
    
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({message:`delete goal ${req.params.id}`});
});

module.exports = {
    getGames,
    getUserGames,
    setGame,
    updateGame,
    deleteGame
}
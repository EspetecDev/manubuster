const asyncHandler = require('express-async-handler');
const Game = require('../models/gameModel');
const User = require('../models/userModel');
const axios = require('axios');
const { set } = require('mongoose');
const {allowedPlatforms} = require('../config/constants');

// const baseURI = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4';
const baseURI = 'https://api.igdb.com/v4';
const headers = {
    'Accept': 'application/json',
    'Client-ID': process.env.IGDB_CLIENTID,
    'Authorization': process.env.IGDB_TOKEN,
};

async function GetImageByGame(gameName) {
    try {
        const image = await axios.get('https://i.imgur.com/VMUUoOU.jpeg');
        return image.status == 200 ? image.data : undefined;
    } catch (e) {
        console.log(e);
    }
}

// @desc Get all games
// @route GET /api/cover
// @access Public
const getGameCover = asyncHandler(async (req, res) => {
    var gameUrl = '';
    await axios({
        url: `${baseURI}/covers`,
          method: 'POST',
          headers: headers,
          data: `fields url; where id = ${req.body.gameId}; limit 1;`
        })
        .then(response => {
            gameUrl = response.data[0].url ?? '';
        })
        .catch(err => {
            console.log(err);
        });

    res.status(200).json({url: gameUrl});
});

// @desc Get all games
// @route GET /api/games
// @access Public
const getGames = asyncHandler(async (req, res) => {
    // get all games
    const games = await Game.find();
    var returnGames = [];
    games.forEach( g => returnGames.push(g.toJSON()));
    for(var i=0; i<games.length; i++){
        const owner = await User.findById(games[i].owner);
        if(!owner){
            res.status(500).json({reason: 'internal error'});
        }
        returnGames[i].owner = owner.name;
    }
    res.status(200).json(returnGames);
});

// @desc Get user reserved games
// @route GET /api/games
// @access Public
const getUserGames = asyncHandler(async (req, res) => {
    const userGames = await Game.find({owner: req.user.id });
    const rentUsersIds = [];
    userGames.forEach((game) => {
        if(game.lentTo){
            rentUsersIds.push(game.lentTo);
        }
    });
    var rentUsers = [];
    for(var i=0; i<rentUsersIds.length; i++){
        const userName = await User.findById(rentUsersIds[i]._id);
        rentUsers.push({id: rentUsersIds[i]._id, user: userName.name});
    }
    newUserGames = [];
    userGames.forEach((game) =>{
        var newGame = game.toJSON();
        if(game.lentTo){
            var rentUser = rentUsers.filter((u) => { 
                return u.id.id === game.lentTo.id;
            });
            if(!rentUser){
                res.status(500).json({reason: 'server error'});
                return game;
            }
            newGame.lentDisplayName = rentUser[0].user;
            // days lent
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            newGame.daysLent = Math.round(Math.abs((Date.now() - game.reservedDate) / oneDay));
        }
        newUserGames.push(newGame);
    })
    res.status(200).json(newUserGames);
});

const getReservedGames = asyncHandler(async (req, res) => {
    const reservedGames = await Game.find({lentTo: req.user.id })
    res.status(200).json({reservedGames});
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
    if( allowedPlatforms.indexOf(req.body.platform) <= -1 ){
        res.status(400);
        throw new Error(`Please add a valid platform: ${allowedPlatforms}`);
    }
    const owner = await User.find({name: req.body.owner});
    if(owner.length === 0){
        res.status(400);
        throw new Error(`Owner: ${req.body.owner} is not registered`);
    }

    var igdbIDValue = -1;
    await axios({
          url: `${baseURI}/games`,
          method: 'POST',
          headers: headers,
          data: `fields url; where id = ${req.body.name}; limit 1;`
        })
        .then(response => {
            igdbIDValue = response.data[0].id ?? '';
        })
        .catch(err => {
            console.log(err);
        });

    if(igdbIDValue === -1){
        res.status(400);
        throw new Error(`Could not get igdb id for name: ${req.body.name}`);
    }

    // check if already exists
    const game = await Game.find({
        name: req.body.name,
        owner: owner.id,
        platform: req.body.platform
    });

    if(game.length !== 0){
        res.status(400);
        throw new Error(`Game already registered`);
    }
    const cover = await GetImageByGame(req.body.name);
    const newGame = await Game.create({
        name: req.body.name,
        platform: req.body.platform,
        owner: owner[0].id,
        igdbID: igdbIDValue
    });
    // newGame.owner = owner._id;
    // await newGame.save();
    res.status(200).json(newGame);
});

// @desc Update game
// @route PUT /api/games/:id
// @access Private
const updateGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.body.id);
    if(!game){
        res.status(400);
        throw new Error(`game id ${req.body.id}  not found`);
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error(`User id ${req.user.id} not found`);
    }
    // make sure that the logged user matches the game user
    if(game.owner.toString()  !== user.id && !user.isAdmin){
        res.status(401)
        throw new Error('user not authorized');
    }

    var igdbIDValue = -1;
    var coverId = -1;
    await axios({
          url: `${baseURI}/games`,
          method: 'POST',
          headers: headers,
          data: `fields id, cover; search "${game.name}"; limit 1;`
        })
        .then(response => {
            igdbIDValue = response.data[0].id ?? '';
            coverId = response.data[0].cover ?? '';
        })
        .catch(err => {
            console.log(err);
        });

    if(igdbIDValue === -1 || coverId === -1){
        res.status(400);
        throw new Error(`Could not get igdb id nor cover for name: ${game.name}`);
    }

    var coverURL = '';
    await axios({
        url: `${baseURI}/covers`,
        method: 'POST',
        headers: headers,
        data: `fields url; where id = ${coverId}; limit 1;`
      })
      .then(response => {
          coverURL = response.data[0].url ?? '';
      })
      .catch(err => {
          console.log(err);
      });

    if(coverURL === ''){
        res.status(400);
        throw new Error(`Could not get igdb cover url for name: ${game.name}`);
    }
    req.body.igdbID = igdbIDValue;
    req.body.coverUrl = coverURL;

    const updatedGame = await Game.findByIdAndUpdate(req.body.id, req.body, {new: true,});
    res.status(200).json(updatedGame);
});

// @desc Delete game
// @route DELETE /api/games/:id
// @access Private
const deleteGame = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.body.id);
    if(!game){
        res.status(400);
        throw new Error(`game id ${req.body.id} not found`);
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error(`User id ${req.user.id} not found`);
    }
    // make sure that the logged user matches the goal user
    if(game.owner.toString() !== user.id && !user.isAdmin){
        res.status(401)
        throw new Error('user not authorized');
    }
    
    // const deletedGame = await Game.findByIdAndDelete(req.body.id);
    res.status(200).json({message:`delete goal ${req.body.id}`});
});

const reserveGame = asyncHandler(async(req, res) => {
    const game = await Game.findById(req.body.gameId);
    if(!game){
        res.status(400);
        throw new Error(`game id ${req.body.gameId} not found`);
    }
    // check if the game is already reserved
    if(game.reservedDate){
        res.status(401);
        throw new Error('game already reserved');
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401);
        throw new Error(`User id ${req.user.id} not found`);
    }
    
    const newParams = {
        lentTo: user._id,
        reservedDate: Date.now()
    }
    const updatedGame = await Game.findByIdAndUpdate(req.body.gameId, newParams, {new: true,});
    res.status(200).json({message:`reserved game ${updatedGame}`});
});

const returnGame = asyncHandler(async(req, res) => {
    const game = await Game.findById(req.body.gameId);
    if(!game){
        res.status(400);
        throw new Error(`game id ${req.body.gameId} not found`);
    }
    // check if the game is already reserved
    if(!game.reservedDate){
        res.status(401);
        throw new Error('game not reserved');
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401);
        throw new Error(`User id ${req.user.id} not found`);
    }

    const allowedUser = (
                            //user._id.toString() === game.lentTo.toString() &&
                            user._id.toString() === game.owner.toString() ||
                            user.isAdmin
                        );
    if(!allowedUser){
        res.status(401);
        throw new Error(`this user can't undo the reserve`);
    }

    game.lentTo = undefined;
    game.reservedDate = undefined;
    await game.save();
    // const newParams = {
    //     lentTo: "",
    //     reservedDate: undefined
    // }
    // const updatedGame = await Game.findByIdAndUpdate(req.body.gameId, {$unset: "lentTo", $unset: "reservedDate"}, {new: true,});
    res.status(200).json({message:`returned game ${game}`});
});

module.exports = {
    getGames,
    getUserGames,
    setGame,
    updateGame,
    deleteGame,
    reserveGame,
    returnGame,
    getReservedGames,
    getGameCover
}
import { getSessionInfo } from "../../helpers/helpers";
import axios from 'axios';
import qs from 'qs';

const axiosSettings = (method, needsToken, data, serviceUrl) => {
    return ({
        method: method,
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Authorization": needsToken ? `Bearer ${getSessionInfo().token}` : "",
            "Content-Type" : 'application/json'
        },
        data: data,
        url: process.env.REACT_APP_BACKEND_URI+serviceUrl
    });
}

export const deleteGame = (gameId) => {
    axios(axiosSettings('delete', true, {id: gameId}, '/games/userGames'))
    .then((req, res) =>{
        console.log(`successful delete game with id: ${gameId}`);
    }).catch((e) => console.log(e));
};

export const unreserveGame = (gameId) => {
    axios(axiosSettings('put', true, {gameId: gameId}, '/games/reserve'))
    .then((req, res) =>{
        console.log(`successful returned game with id: ${gameId}`);
    }).catch((e) => console.log(e));
};

export async function getUserGames() {
    const games = await axios(axiosSettings('get', true, '', '/games/userGames'))
    .then( (req, res) => {
        // change _id to id to support datagrid
        req.data.forEach((g) => {
            Object.defineProperty(g, 'id',
                Object.getOwnPropertyDescriptor(g, '_id'));
            delete g['_id'];
        })
        return req.data;
    }).catch((e) => console.log(e));
    return games;
}

export async function searchGames(inQuery) {

    const games = await axios(axiosSettings('post', true, {query: inQuery}, '/games/query'))
    .then( (req, res) => {
        return req.data;
    }).catch((e) => console.log(e));
    return games;
}
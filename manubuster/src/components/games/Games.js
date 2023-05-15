import '../../style/Games.css';
import GameCard from "./GameCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import * as GAC from './GameApiCalls';



const Games = () => {
    const [games, setGames] = useState([]);
    const [inputValue, setInputValue] = useState('');

    async function refreshGames(){
        setGames(await GAC.getAllGames());
    }

    useEffect( () => {
        refreshGames();
    }, []);

    return (
        <div className="gamesWidget">
        <div className="gamesAutocomplete">
            <Autocomplete
                freeSolo
                id="gameListWidget"
                options={games.sort((a, b) => -b.platform.localeCompare(a.platform))}
                groupBy={(game) => game.platform}
                getOptionLabel={(game) => game.name}
                sx={{ width: 500 }}
                renderInput={(params) => <TextField {...params} variant="standard" label="Search game..." />}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue); 
                }}
            />
        </div>

        <div className="games">
            <Grid container spacing={5}>
            {games.filter( g => { return g.name.includes(inputValue ?? '')}).map((gameInfo, index) => (
                <Grid item key={index} xs={'auto'} md={'auto'} >
                    <GameCard gameInfo={gameInfo}></GameCard>
                </Grid>
            ))}
            </Grid>
        </div>
        </div>
    );
}
 
export default Games;
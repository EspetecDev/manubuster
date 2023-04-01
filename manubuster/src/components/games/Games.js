import '../../style/Games.css';
import GameCard from "./GameCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';



const Games = () => {
    const [games, setGames] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const gamesTest = [
        {name: 'test1', owner:'owner1', platform:'platform1'},
        {name: 'test2', owner:'owner2', platform:'platform2'},
    ]

    useEffect( () => {
        axios.get('http://localhost:5000/api/games/')
            .then( (res) => {
                console.log('axios call');
                setGames(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    return (
        <div className="gamesWidget">
        <div className="gamesAutocomplete">
            <Autocomplete
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
            {games.filter((game) => { return inputValue ? game.name.includes(inputValue) : true}).map((_, index) => (
                <Grid xs={8} sm={4} md={2} key={index}>
                    <GameCard gameInfo={games[index]}></GameCard>
                </Grid>
            ))}      
            </Grid>
        </div>
        </div>
    );
}
 
export default Games;
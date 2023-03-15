import GameCard from "./GameCard";
import Grid from '@mui/material/Grid'; // Grid version 1
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";


const Games = () => {
    
    const games = [
        {name: "g1", img: "img", platform: "switch", owner: "manu", state: "lent", lentTo: "imae"},
        {name: "g2", img: "img", platform: "ps5", owner: "manu", state: "lent", lentTo: "javie"},
        {name: "g3", img: "img", platform: "switch", owner: "manu", state: "playing", lentTo: ""}
    ];
    const [value, setValue] = (games[0]);
    const [inputValue, setInputValue] = useState('');
    
    return (
        <div className="Games">
            <Autocomplete
                id="gameListWidget"
                options={games.sort((a, b) => -b.platform.localeCompare(a.platform))}
                groupBy={(game) => game.platform}
                getOptionLabel={(game) => game.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search game..." />}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue); 
                }}
            />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(games.length)).map((_, index) => (
                    <Grid item xs={3} sm={4} md={4} key={index}>
                    <GameCard gameName={games[index]}></GameCard>
                    </Grid>
                ))}
            </Grid>
            <button>a</button>
            <div className="debug">
                <h1>a</h1>
            </div>
            
        </div>
    );
}
 
export default Games;
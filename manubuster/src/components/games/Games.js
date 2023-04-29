import '../../style/Games.css';
import GameCard from "./GameCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';



const Games = () => {
    const [games, setGames] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [comps, setComps] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:5000/api/games/')
            .then( (res) => {
                setGames(res.data);
                filterCards();
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    function filterCards(){
        var list = [];
        //|| g.platform.includes(inputValue)
        games.filter( g => { 
            return inputValue ? g.name.includes(inputValue) :true 
        }).map((gameInfo, index) => (
            list.push(<Grid item key={index} xs={8} sm={4} md={2} >
                <GameCard gameInfo={gameInfo}></GameCard>
            </Grid>)
        ));

        setComps(list);

        // list.forEach(e => { console.log(e.props.children.props.gameInfo.name)});
        // console.log();
    }

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
                    filterCards();
                }}
            />
        </div>

        <div className="games">
            <Grid container spacing={5}>
            {games.filter( g => { return g.name.includes(inputValue ?? '')}).map((gameInfo, index) => (
                <Grid item key={index} xs={8} sm={4} md={2} >
                    <GameCard gameInfo={gameInfo}></GameCard>
                </Grid>
            ))}
            {/* {comps} */}
            </Grid>
        </div>
        </div>
    );
}
 
export default Games;
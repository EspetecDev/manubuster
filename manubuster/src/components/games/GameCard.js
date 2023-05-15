import '../../style/GameCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from "react";
import {yellowColor, blueColor} from '../../helpers/consts';
import { createTheme, ThemeProvider } from '@mui/material';
import { getSessionInfo } from '../../helpers/helpers';
import * as GAC from './GameApiCalls';

const theme = createTheme({palette: { warning: {main: yellowColor}, primary: {main: blueColor}}});

const GameCard = (gameInfoParam) => {
    const [gameInfo] = useState(gameInfoParam.gameInfo);
    const [showReserveButton, setShowReserveButton] = useState(true);

    function checkGameStatus(param){
        let localGameInfo = param;
        if (!param)
            localGameInfo = gameInfo;
        const sessionInfo = getSessionInfo();
        return localGameInfo.owner !== sessionInfo.name && !localGameInfo.reservedDate

    }

    useEffect( () => {
        setShowReserveButton(checkGameStatus(gameInfoParam.gameInfo));
    }, []);

    async function onReserve(){
        await GAC.reserveGame(gameInfo._id);
        setShowReserveButton(checkGameStatus(gameInfoParam.gameInfo));
    }
    
    return ( 
        <div className="zoom">
        <Card sx={{ width: 250 }} variant="outlined">
            <CardMedia component="img" src={gameInfo.coverUrl}/>
            <CardContent>
                <ThemeProvider theme={theme}>
                    { !gameInfo.coverUrl && <CircularProgress color="warning" value={50} />}
                </ThemeProvider>
                <Typography variant="h5" component="div">{gameInfo.name ? gameInfo.name : 'game'}</Typography>
                <Typography variant="h6" component="div">{gameInfo.platform ? gameInfo.platform : 'switch'}</Typography>
                <Typography variant="button" component="div">{gameInfo.owner ? `OWNER: ${gameInfo.owner}` : 'owner'}</Typography>
                { gameInfo.lentTo && <Typography variant="button" component="div">{`BOOKED ON: ${gameInfo.reservedDate}`}</Typography>}
                { gameInfo.lentTo && <Typography variant="button" component="div">{`BOOKED BY: ${gameInfo.lentTo}`}</Typography>}
            </CardContent>
            <CardActions sx={{display: "block"}} >
                {showReserveButton  &&  <Button variant='contained' onClick={onReserve} size="medium">RESERVE</Button>}
            </CardActions>
        </Card>
        </div>
    );
}
 
export default GameCard;
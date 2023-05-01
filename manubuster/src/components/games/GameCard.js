import '../../style/GameCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
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
        <Card sx={{ maxWidth: 250 }}>
            <CardMedia component="img" src={gameInfo.coverUrl}/>
            <CardContent>
                <ThemeProvider theme={theme}>
                    { !gameInfo.coverUrl && <CircularProgress color="warning" value={50} />}
                </ThemeProvider>
                <Typography gutterBottom variant="h5" component="div">{gameInfo.name ? gameInfo.name : 'game'}</Typography>
                <Typography gutterBottom variant="h5" component="div">{gameInfo.platform ? gameInfo.platform : 'switch'}</Typography>
                <Typography gutterBottom variant="h5" component="div">{gameInfo.owner ? gameInfo.owner : 'owner'}</Typography>
                { gameInfo.lentTo !== undefined &&
                  <Typography gutterBottom variant="h5" component="div">{gameInfo.lentTo}</Typography> &&
                  <Typography gutterBottom variant="h5" component="div">{gameInfo.reservedDate}</Typography>
                }
            </CardContent>
            <CardActions sx={{display: "block"}} >
                {showReserveButton  &&  <Button variant='contained' onClick={onReserve} size="medium">RESERVE</Button>}
            </CardActions>
        </Card>
        </div>
    );
}
 
export default GameCard;
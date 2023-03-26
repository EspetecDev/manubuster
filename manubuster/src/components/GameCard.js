import '../style/GameCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import getGameCover from '../helpers/externalCalls'
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from "react";
import {yellowColor, blueColor} from '../helpers/consts';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({palette: { warning: {main: yellowColor}, primary: {main: blueColor}}});

const GameCard = (gameInfoParam) => {
    const gameInfo = gameInfoParam.gameInfo ?? '';
    // const [coverURL, setCoverURL] = useState('');
    const [coverLoaded, setCoverLoaded] = useState(false);
    const [reserveState, setReserveState] = useState('');

    var coverURL = '';
    if(gameInfo.coverUrl){
        const imageSize = 't_'+'cover_big';
        gameInfo.coverUrl.split('/').forEach((elem) => { 
            coverURL = coverURL.concat('/', elem ? elem.startsWith('t_') ? imageSize : elem : '');
        });
    }
    // const coverURL = gameInfo.coverUrl.replace('');

    // useEffect( () => {
    //     if(gameInfo.name){
    //         getGameCover(gameInfo.name).
    //         then( (url) => {
    //              setCoverURL(url); 
    //              setCoverLoaded(true);
    //         }).
    //         catch( (err) => { console.error(err); });
    //     }
    // }, []);

    return ( 
        <div className="zoom">
        {/* {!coverLoaded && <CircularProgress color="warning" size="md" value={50} variant="plain"/>} */}
        <Card sx={{ maxWidth: 250 }}>
            <CardMedia component="img" src={coverURL}/>
            <CardContent>
                <ThemeProvider theme={theme}>
                    { !coverURL && <CircularProgress color="warning" value={50} />}
                </ThemeProvider>
                <Typography gutterBottom variant="h5" component="div">{gameInfo.name ? gameInfo.name : 'game'}</Typography>
                <Typography gutterBottom variant="h5" component="div">{gameInfo.platform ? gameInfo.platform : 'switch'}</Typography>
                <Typography gutterBottom variant="h5" component="div">{gameInfo.owner ? gameInfo.owner : 'owner'}</Typography>
                { gameInfo.lentTo !== undefined &&
                  <Typography gutterBottom variant="h5" component="div">{gameInfo.lentTo}</Typography> &&
                  <Typography gutterBottom variant="h5" component="div">{gameInfo.reservedDate}</Typography>
                }
            </CardContent>
            <CardActions>
                <Button size="large">RESERVE</Button>
            </CardActions>
        </Card>
        </div>
    );
}
 
export default GameCard;
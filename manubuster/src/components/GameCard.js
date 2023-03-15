import { Button } from "@mui/material";
import { useState } from "react";


const GameCard = ({gameName}) => {

    // 1 param, 2 func to change param value
    
    
    const gameInfo = gameName;//{name: "g1", img: "img", owner: "manu", state: "lent", lentTo: "imae"};
    const [reserveState, setReserveState] = useState(gameInfo.state);
    const OnReserve = () => {
        if(gameInfo.state !== "lent")
            setReserveState('reserved');
    };

    // let gameInfo = getInfoByName();
    return ( 
        <div className="Card">
            <img src="../gametest.bmp" alt="" />
            <div className="cardRow">{gameInfo.name}</div>
            <div className="cardRow">{gameInfo.owner}</div>
            <div className="cardRow">{reserveState}</div>
            {gameInfo.state === "lent" &&
                <div className="cardRow">{gameInfo.lentTo}</div>
            }
            {
            gameInfo.state !== "lent" && reserveState !== "reserved" &&
                <Button onClick={OnReserve}>Reserve</Button>
            }
            
        </div>

    );
}
 
export default GameCard;
import {useState} from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { 
    Button,
    Tooltip } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSessionInfo } from '../../helpers/helpers';
import * as GAC from './GameApiCalls';

const DataGridActions = (props) => {
    const callbackFunction = props.callback;
    const sessionInfo = getSessionInfo();
    const [showConfirm, setShowConfirm] = useState('');
    const [localParams, setLocalParams] = useState(props.params);
    const currentGame = props.params.row.id;
                
    const handleConfirm = () => {
        console.log(`handle ${showConfirm}`);
        if(showConfirm === 'delete'){
            GAC.deleteGame(currentGame);
            callbackFunction();
        } else if (showConfirm == 'unreserve'){
            GAC.unreserveGame(currentGame);
            callbackFunction();
        }
    };

    if(!showConfirm){
        return(
            <Box hidden={showConfirm !== ''} sx={{display: 'block'}}>
                <Tooltip  title='Cancel reserve'>
                    <span>
                    <Button disabled={!localParams.row.lentTo} onClick={()=>{setShowConfirm('unreserve')}}><BookmarkRemoveIcon/></Button>
                    </span>
                </Tooltip>
                <Tooltip title='Remove game'>
                    <Button onClick={()=>{setShowConfirm('delete')}}><DeleteIcon/></Button>
                </Tooltip>
            </Box>
        );        
    } else {
        return(
            <Box hidden={showConfirm === ''} sx={{display: 'block'}}>
                    <Tooltip title='Confirm'>
                        <Button onClick={handleConfirm}><CheckOutlinedIcon/><span/></Button>
                    </Tooltip>
                    <Tooltip title='Cancel'>
                        <Button onClick={()=>{setShowConfirm('')}}><CloseOutlinedIcon/><span/></Button>
                    </Tooltip>
            </Box>
        );
    }
};

export default DataGridActions;
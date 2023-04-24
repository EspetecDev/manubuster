import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getSessionInfo } from '../../helpers/helpers';
import { Button, Modal, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DataGridActions from './DataGridComponents';
import * as GAC from './GameApiCalls';
import AddGame from './AddGame';
import { Add } from '@mui/icons-material';

const MyGames = () => {
    const [games, setGames] = React.useState([]);
    const [openNewGameModal, setopenNewGameModal] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '75%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };
    const refreshGames = async () => {
        setLoadingData(true);
        setGames(await GAC.getUserGames());
        setLoadingData(false);
    }
    function addGame() {
    
    }
    
    function handleClose() {
        setopenNewGameModal(false);
    }

    React.useEffect( () => {
        refreshGames();
    }, []);

    const columns =  [
        {
            flex: 1,
            field: 'name',
            headerName: 'Name'
        },
        {
            flex: 1,
            field: 'platform',
            headerName: 'Platform'
        },
        {
            flex: 1,
            field: 'lentDisplayName',
            headerName: 'Lent to'
        },
        {
            flex: 1,
            field: 'reservedDate',
            headerName: 'Reserved Date',
            type: 'date',
            minWidth: 200,
            valueGetter: ({ value }) => value && new Date(value),
        },
        {
            flex: 1,
            field: 'daysLent',
            headerName: 'Total days',
        },
        {
            flex: 1,
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => <DataGridActions params={{...params}} callback={refreshGames}/>
        }
        
      ];

    return ( 
        <div className="mygames">
        <Box sx={{ width: '75%', display:'inline-block', marginTop: '20px'}}>
            <Button sx={{display: 'block', marginBottom: '20px'}} variant='contained' onClick={() => setopenNewGameModal(true)}>Add Game</Button>
            <Box sx={{ height: '500px', width: '75%', display:'flex' }}>
                <DataGrid
                    loading={loadingData}
                    columns={columns}
                    rows={games}
                    />
            </Box>
        </Box>
        <Modal
        open={openNewGameModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style}}>
                <AddGame></AddGame>
            </Box>
        </Modal>
        </div>
        
     );
}
 
export default MyGames;
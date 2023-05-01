import '../../style/MyGames.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Stack } from '@mui/material';
import DataGridActions from './DataGridComponents';
import * as GAC from './GameApiCalls';
import AddGame from './AddGame';
import { useNavigate } from 'react-router-dom';


const MyGames = () => {
    const [games, setGames] = React.useState([]);
    const [openNewGameModal, setopenNewGameModal] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
	const navigate = useNavigate();

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
        navigate(0);
    }

    async function loadData(){
        setLoadingData(true);
        setGames(await GAC.getUserGames());
        setLoadingData(false);
    }

    function handleClose() {
        setopenNewGameModal(false);
        refreshGames();
    }

    React.useEffect( () => {
        loadData();
    }, []);

    const columns =  [
        {
            flex: 2,
            field: 'name',
            headerName: 'Name'
        },
        {
            flex: 1,
            field: 'platform',
            headerName: 'Platform',
        },
        {
            flex: 1,
            field: 'lentDisplayName',
            headerName: 'Lent to',
        },
        {
            flex: 1,
            field: 'reservedDate',
            headerName: 'Reserved Date',
            type: 'date',
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
            renderCell: (params) => <DataGridActions params={{...params}} callback={refreshGames}/>
        }
        
      ];

    return ( 
        <div className="mygames">
        <Stack spacing={2}>
            <Button variant='contained' onClick={() => setopenNewGameModal(true)}>Add Game</Button>
            <DataGrid
                autoHeight
                sx={{height: "500px"}}
                loading={loadingData}
                columns={columns}
                rows={games}>
            </DataGrid>
        </Stack>
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
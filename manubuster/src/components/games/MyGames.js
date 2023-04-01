import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getSessionInfo } from '../../helpers/helpers';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DataGridActions from './DataGridComponents';
import * as GAC from './GameApiCalls';



const MyGames = () => {
    const [games, setGames] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);

    const refreshGames = async () => {
        setLoadingData(true);
        setGames(await GAC.getUserGames());
        setLoadingData(false);
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
        <Box sx={{ height: '500px', width: '75%', display:'inline-block', marginTop: '20px' }}>
            <Button onClick={refreshGames}>REFRESH</Button>
            <DataGrid
                loading={loadingData}
                columns={columns}
                rows={games}
            />
        </Box>
     );
}
 
export default MyGames;
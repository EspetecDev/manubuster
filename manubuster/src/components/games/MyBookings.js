import '../../style/MyGames.css';
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import * as GAC from './GameApiCalls';
import DataGridActions from './DataGridComponents';
import { Typography } from '@mui/material';

const MyBookings = () => {
    const [games, setGames] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(true);
	const navigate = useNavigate();
    
    const refreshGames = async () => {
        navigate(0);
    }

    async function loadData(){
        setLoadingData(true);
        let reservedGames = await GAC.getUserBookings();
        if(reservedGames)
            setGames(reservedGames);
        setLoadingData(false);
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
            field: 'owner',
            headerName: 'Owner',
        },
        {
            flex: 1,
            field: 'reservedDate',
            headerName: 'Reserved Date',
            valueGetter: ({ value }) => value && new Date(value).toLocaleDateString('es-ES'),
        },
        {
            flex: 1,
            field: 'daysLent',
            headerName: 'Total days',
        },
        // {
        //     flex: 1,
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     renderCell: (params) => <DataGridActions params={{...params}} callback={refreshGames}/>
        // }
        
      ];

    return ( 
        <div sx={{'padding-top': '20px'}}>
        <Typography>MY BOOKINGS</Typography>
        <div className="mygames">
        <DataGrid
            autoHeight
            loading={loadingData}
            columns={columns}
            rows={games}>
        </DataGrid>
        </div>
        </div>
    );
}
 
export default MyBookings;
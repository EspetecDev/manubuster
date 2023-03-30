import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getSessionInfo } from '../../helpers/helpers';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

const MyGames = () => {
    const [games, setGames] = React.useState([]);
    React.useEffect( () => {
        const sessionInfo = getSessionInfo();
        if(!sessionInfo)
            return;
        axios({
            method: 'get',
            headers: {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Authorization": 'Bearer '+sessionInfo.userToken
            },
            url: process.env.REACT_APP_BACKEND_URI+'/games/userGames',
            }).then( (req, res) => {
                // change _id to id to support datagrid
                req.data.forEach((g) => {
                    Object.defineProperty(g, 'id',
                        Object.getOwnPropertyDescriptor(g, '_id'));
                    delete g['_id'];
                })
                setGames(req.data);
            })
            .catch((err) => {
                console.log(err);
            });
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
            renderCell: (params) => {
               
                const handleRemoveGame = () => {
                    console.log('remove game ' + params.id);
                };
                
                const unreserveGame = () => {
                    console.log('unreserveGame game '+ params.id);
                };
                return(
                    <Box sx={{display: 'block'}}>
                        <Tooltip title='Cancel reserve'>
                            <Button onClick={unreserveGame}><BookmarkRemoveIcon/></Button>
                        </Tooltip>
                        <Tooltip title='Remove game'>
                            <Button onClick={handleRemoveGame}><DeleteIcon/></Button>
                        </Tooltip>
                    </Box>
                );
            }
        }
        
      ];

    return ( 
        <Box sx={{ height: '500px', width: '75%', display:'inline-block', marginTop: '20px' }}>
            <DataGrid
                columns={columns}
                rows={games}
            />
        </Box>
     );
}
 
export default MyGames;
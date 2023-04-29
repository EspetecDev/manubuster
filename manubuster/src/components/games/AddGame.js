import '../../style/Games.css';
import { Button, ListItem, TextField, Box, Typography, Autocomplete, FormLabel } from "@mui/material";
import Grid from '@mui/material/Grid'; // Grid version 1
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {useState, forwardRef} from 'react';
import { DataGridAddGame } from "./DataGridComponents";
import TravelExploreSharpIcon from '@mui/icons-material/TravelExploreSharp';
import { searchGames } from './GameApiCalls';
import * as GAC from './GameApiCalls';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddGame = () => {
    const platforms = ['Playstation 4', 'Playstation 5', 'Nintendo Switch'];
    const [searchResults, setSearchResults] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    /* States:  error warning info success */
    const [snackState, setSnackState] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackType, setSnackType] = useState('');
    const [processAddGame, setProcessAddGame] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [query, setQueryValue] = useState('');
    const [platform, setPlatformValue] = useState('');

    async function getSearchResults(event) {
        setLoadingData(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let result =  await searchGames(data.get("query"));
        console.log(result)
        setSearchResults(result);
        const platform = data.get("platform");

        setLoadingData(false);
    }

    async function addGame(game, btn){
        let message = await GAC.addGame(game.igdbId);
        setSnackState(true);
        setSnackMessage(message.msg);
        setSnackType(message.type);
    }

    const columns =  [
        {
            flex: 1,
            field: 'cover',
            headerName: 'Cover',
            renderCell: (params) => <img src={params.row.cover} />
        },
        {
            flex: 2,
            field: 'name',
            headerName: 'Name'
        },
        {
            flex: 1,
            field: 'platform',
            headerName: 'Platform'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 50,
            renderCell: (params) => <DataGridAddGame params={{...params}} callback={addGame} />
        }
        
      ];

    return ( 
        <form onSubmit={getSearchResults}>
            <Grid container spacing={3} >
                <Grid item xs={12}>   
                    <Typography>Add Game</Typography>
                </Grid>
                <Grid item xs={2} >
                        <TextField id="query" name="query" label="Game Name" type="search" /> 
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        disablePortal
                        id="platform"
                        // onSubmit={(v) => setPlatformValue(v)}
                        options={platforms}
                        renderInput={(params) => <TextField id="platform" name="platform" {...params} label="Platfom" />}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button variant='contained' type="submit" sx={{ marginLeft: "15px", backgroundColor:'rgb(255,169,3)', color:'black', top: '50%', transform: 'translateY(-50%)' }} startIcon={<TravelExploreSharpIcon/>} className='btn' color="warning" >SEARCH</Button>
                </Grid>
            </Grid>
                <Box sx={{ height: '400px', display:'flex', marginTop: '10px' }} >
                <DataGrid
                    
                    rowHeight={150}
                    loading={loadingData}
                    columns={columns}
                    rows={searchResults}
                    initialState={{
                        filter: {
                          filterModel: {
                            items: [],
                            quickFilterValues: [''],
                          },
                        },
                      }}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                />
                </Box>

                <Snackbar open={snackState} autoHideDuration={6000} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} onClose={()=> setSnackState(false)}>
                <Alert onClose={()=> setSnackState(false)}  severity={snackType} sx={{ width: '100%' }}>
                {snackMessage}
                </Alert>
                </Snackbar>
        </form>
    );
}
 
export default AddGame;
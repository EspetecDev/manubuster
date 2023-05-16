import { Button, Box } from "@mui/material"
import { theme } from '../helpers/consts';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import CoffeeIcon from '@mui/icons-material/Coffee';

var style = {
    backgroundColor: "#102fad",
    borderTop: "1px solid #E7E7E7",
    textAlign: "right",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function Footer() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <ThemeProvider theme={theme}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{display: 'flex'}}>
                            {/* <Typography variant="h6" className='logo'>
                            MANUBUSTER
                            </Typography> */}
                            <Button color="warning" target="_blank" href="https://github.com/EspetecDev">
                            <GitHubIcon />
                            </Button>
                            <Button color="warning" target="_blank" href="https://twitter.com/EspetecDev">
                            <TwitterIcon />
                            </Button>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                        <Button endIcon={<CoffeeIcon fontSize="small"/>} variant='contained' href="https://ko-fi.com/espetec" sx={{ marginLeft: "25px" }} target="_blank" className='btn' color="warning" >Buy me a coffe</Button>
                        </Box>
                    </Toolbar>
                </ThemeProvider>
            </div>
        </div>

    )
}

export default Footer
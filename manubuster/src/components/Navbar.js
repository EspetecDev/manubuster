// sfc : stateless functional component

import { Button } from "@mui/material";

const Navbar = () => {
    return ( 

        <div className="navbar">
            <h1>Manubuster</h1>
            <div className="links">
                <Button href="/">Games</Button>
                <Button>Login</Button>
                <Button>Register</Button>
            </div>
        </div>
     );
}
 
export default Navbar;
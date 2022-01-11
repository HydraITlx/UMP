import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import logo from "../../images/logo.jpeg";
import Menu from "../Sidebar/Menu";
import LogOut from "../LogOut/Logout";
//import IconButton from "@mui/material/IconButton";

export default function ButtonAppBar() {
  const [dropdown, setDropdown] = useState(true);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: "#3c6090", width: "100%" }}
      >
        <Toolbar>
          <Box
            sx={{
              mr: 3,
            }}
          >
            <Menu sx={{ mr: 3 }} />
          </Box>
          <Box display="flex" flexGrow={1}>
            <img className="logoImage" src={logo} alt="logo"></img>
            <p>S20</p>
          </Box>
          <LogOut className="showlogout" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

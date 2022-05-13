import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import logo from "../../images/logo.PNG";
import Menu from "../Sidebar/Menu";
import LogOut from "../LogOut/Logout";
import Notification from "./Notifications";
//import IconButton from "@mui/material/IconButton";
import { io } from "socket.io-client";
import { GetNotificationSettings } from "../Requests/NotificationRequests";
export default function ButtonAppBar() {
  const [socket, setSocket] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);
  const [username, setusername] = useState("");
  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SOCKET_IO));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let userID = sessionStorage.getItem("userID");
      userID = JSON.parse(userID);

      if (userID === null) {
        userID = localStorage.getItem("userID");
        userID = JSON.parse(userID);
      }
      setusername(userID);
      GetNotificationSetting(userID);
      socket?.emit("newUser", userID);
      socket?.emit("checkNotifications", userID);
    }, 1000);
  }, [socket]);

  const GetNotificationSetting = async (username) => {
    const Settings = GetNotificationSettings(username);
    handleNotificationSettings(Settings);
  };

  const handleNotificationSettings = (AuthPromise) => {
    {
      if (AuthPromise === undefined) {
        return;
      }

      AuthPromise.then((response) => {
        if (response !== undefined) {
          setSendEmail(response[0].DontSendEmail);
          console.log(response);
        }
      });
    }
  };

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
            <img
              className="logoImage"
              src={logo}
              alt="logo"
              style={{ paddingBottom: 3 }}
            ></img>
          </Box>

          <Notification
            sendEmail={sendEmail}
            socket={socket}
            usernameProp={username}
            style={{ padingRight: 550 }}
          />

          <LogOut className="showlogout" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

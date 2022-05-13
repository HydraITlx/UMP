import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NoficationItems from "./Notifications_List";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  MarkNotificationAsRead,
  ChangeNotificationSettings,
} from "../Requests/NotificationRequests";

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState([]);
  const [EmailSettings, setEmailSettings] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ChangeSettings = (e, username) => {
    setIsDisabled(true);
    ChangeNotificationSettings(username, e.target.checked);
    setEmailSettings(e.target.checked);
    setTimeout(() => setIsDisabled(false), 5000);
  };

  const MarkAsRead = (rowData) => {
    console.log(rowData);

    setTimeout(() => {
      MarkNotificationAsRead(rowData);
      const dataDelete = [...notifications];
      const index = notifications.findIndex((e) => e.ID == rowData.ID);
      dataDelete.splice(index, 1);
      setNotifications([...dataDelete]);
      console.log(notifications);
    }, 400);
  };

  useEffect(() => {
    console.log(props.usernameProp);
    props.socket?.on("getNotification", (data) => {
      console.log(data.result);
      setNotifications(data.result);
      console.log(props.sendEmail);
      setEmailSettings(props.sendEmail);
    });
  }, [props.socket]);

  useEffect(() => {
    setTimeout(() => {
      setEmailSettings(props.sendEmail);
      console.log("props.sendEmail");
      console.log(props.sendEmail);
    }, 200);
  }, [props.sendEmail]);

  return (
    <div className="showlogout">
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Notificações">
            <IconButton>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  color="action"
                  style={{ color: "#FFFFFF" }}
                />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 2,
            style: {
              maxWidth: 360,
              minWidth: 290,
              maxHeight: "85%",
              overflow: "auto",
            },
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <div className="NotificationMarkasRead">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={EmailSettings}
                    disabled={isDisabled}
                    onChange={(e) => ChangeSettings(e, props.usernameProp)}
                    sx={{
                      color: "#ad0b90",
                      "&.Mui-checked": {
                        color: "#6d085a",
                      },
                    }}
                  />
                }
                label="Receber Notificações via E-mail"
              />
            </div>
          </MenuItem>
          {notifications.map((item) => (
            <MenuItem
              key={item.ID}
              value={item.Notification_Text}
              onClick={() => MarkAsRead(item)}
            >
              <NoficationItems Notification={item} />
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    </div>
  );
}

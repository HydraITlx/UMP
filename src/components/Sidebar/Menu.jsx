import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divide as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ScienceIcon from "@mui/icons-material/Science";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import CottageIcon from "@mui/icons-material/Cottage";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { runInAction } from "mobx";
import Logout from "@mui/icons-material/Logout";
import UserStore from "../Store/UserStore";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import CategoryIcon from "@mui/icons-material/Category";

export default function TemporaryDrawer(prop) {
  let navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setOpen(!isOpen);

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  //

  const DoLogout = async () => {
    runInAction(() => {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      UserStore.username = "";
      UserStore.userToken = "";
      localStorage.clear();
      sessionStorage.clear();
    });
    navigate("/");
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h1 style={{ color: "white" }}>Menu</h1>
        <p style={{ color: "white" }}>Opções</p>

        <ListItem onClick={() => navigate("home")} button key={"text1"}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Início"} />
        </ListItem>

        <ListItem onClick={() => navigate("home")} button key={"text2"}>
          <ListItemIcon>
            <ScienceIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Laboratorios"} />
        </ListItem>

        <ListItem onClick={() => navigate("home")} button key={"text3"}>
          <ListItemIcon>
            <AccessibilityIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Misericórdia"} />
        </ListItem>

        <ListItem onClick={() => navigate("home")} button key={"text4"}>
          <ListItemIcon>
            <CardTravelIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Encomendas"} />
        </ListItem>

        <ListItem onClick={() => navigate("ucc")} button key={"text5"}>
          <ListItemIcon>
            <CottageIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"UCC"} />
        </ListItem>

        <ListItem onClick={() => navigate("pharmacist")} button key={"text10"}>
          <ListItemIcon>
            <LocalPharmacyIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Farmacêuticos"} />
        </ListItem>

        <ListItem onClick={() => navigate("products")} button key={"text11"}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Produtos"} />
        </ListItem>
      </List>

      {UserStore.isAdmin && <Divider />}
      {UserStore.isAdmin && <p style={{ color: "white" }}>Administração</p>}
      {UserStore.isAdmin && (
        <List>
          <ListItem onClick={() => navigate("group")} button key={"text6"}>
            <ListItemIcon>
              <GroupsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary={"Grupos"} />
          </ListItem>

          <ListItem onClick={() => navigate("user")} button key={"text7"}>
            <ListItemIcon>
              <PeopleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary={"Utilizadores"} />
          </ListItem>

          <ListItem onClick={() => navigate("home")} button key={"text8"}>
            <ListItemIcon>
              <SimCardAlertIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "white" }}
              primary={"Permissões de encomendas"}
            />
          </ListItem>

          <ListItem onClick={() => navigate("home")} button key={"text9"}>
            <ListItemIcon>
              <FormatListNumberedRtlIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary={"Numeração"} />
          </ListItem>
        </List>
      )}
      <Divider />
      <div className="showlogoutmobile">
        <ListItem onClick={DoLogout} button key={"text10"}>
          <ListItemIcon>
            <Logout sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Logout"} />
        </ListItem>
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Hamburger
          sx={{ mr: 3 }}
          toggled={isOpen}
          size={20}
          duration={1.2}
          toggle={toggleDrawer("left", true)}
          color="#FFFFFF"
        />
        <Drawer
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "15%",
              backgroundColor: "#26528d",
              flexShrink: 0,
            },
          }}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

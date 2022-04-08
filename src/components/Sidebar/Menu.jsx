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
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { runInAction } from "mobx";
import Logout from "@mui/icons-material/Logout";
import UserStore from "../Store/UserStore";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import CategoryIcon from "@mui/icons-material/Category";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

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
        <p style={{ color: "white", maxHeight: 0 }}>Opções</p>

        <ListItem onClick={() => navigate("home")} button key={"text1"}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Início"} />
        </ListItem>
        <ListItem onClick={() => navigate("ucc")} button key={"text3"}>
          <ListItemIcon>
            <AccessibilityIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Misericórdia"} />
        </ListItem>

        <ListItem onClick={() => navigate("laboratories")} button key={"text2"}>
          <ListItemIcon>
            <ScienceIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Laboratórios"} />
        </ListItem>

        <ListItem onClick={() => navigate("pharmacist")} button key={"text5"}>
          <ListItemIcon>
            <LocalPharmacyIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Farmacêuticos"} />
        </ListItem>

        <ListItem onClick={() => navigate("products")} button key={"text6"}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Produtos"} />
        </ListItem>

        <ListItem onClick={() => navigate("addorders")} button key={"text4"}>
          <ListItemIcon>
            <AddShoppingCartIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            style={{ color: "white" }}
            primary={"Adicionar Produtos a Encomenda"}
          />
        </ListItem>

        <ListItem onClick={() => navigate("orders")} button key={"text50"}>
          <ListItemIcon>
            <CardTravelIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary={"Encomendas"} />
        </ListItem>

        <ListItem onClick={() => navigate("home")} button key={"text43"}>
          <ListItemIcon>
            <ShoppingCartCheckoutIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            style={{ color: "white" }}
            primary={"Histórico Encomendas"}
          />
        </ListItem>
      </List>

      {UserStore.isAdmin && <Divider />}
      {UserStore.isAdmin && (
        <p style={{ color: "white", maxHeight: 0 }}>Administração</p>
      )}
      {UserStore.isAdmin && (
        <List>
          <ListItem onClick={() => navigate("group")} button key={"text7"}>
            <ListItemIcon>
              <GroupsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary={"Grupos"} />
          </ListItem>

          <ListItem onClick={() => navigate("user")} button key={"text8"}>
            <ListItemIcon>
              <PeopleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary={"Utilizadores"} />
          </ListItem>

          <ListItem
            onClick={() => navigate("orderaccess")}
            button
            key={"text9"}
          >
            <ListItemIcon>
              <SimCardAlertIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "white" }}
              primary={"Permissões UCC/Encomendas"}
            />
          </ListItem>

          <ListItem onClick={() => navigate("uccaccess")} button key={"text11"}>
            <ListItemIcon>
              <AlignHorizontalRightIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "white" }}
              primary={"Permissões UCC/Laboratórios"}
            />
          </ListItem>
          <ListItem
            onClick={() => navigate("dataimport")}
            button
            key={"text12"}
          >
            <ListItemIcon>
              <DataObjectIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "white" }}
              primary={"Importação de Dados"}
            />
          </ListItem>

          <ListItem onClick={() => navigate("numbering")} button key={"text10"}>
            <ListItemIcon>
              <FormatListNumberedRtlIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "white" }}
              primary={"Numeração de Encomendas"}
            />
          </ListItem>
        </List>
      )}
      <Divider />
      <div className="showlogoutmobile">
        <ListItem onClick={DoLogout} button key={"text13"}>
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
          sx={{ mr: 2 }}
          toggled={isOpen}
          size={15}
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
              width: "25%",
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

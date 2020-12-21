import { React, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "./Components/AppBar";
import Connexion from "./Places/Connexion/Connexion";
import Enregistrement from "./Places/Enregistrement/Enregistrement";
import TableauQuete from "./Places/TableauQuete/TableauQuete";
import AjoutQuete from "./Places/AjoutQuete/AjoutQuete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
    display: "Space Around",
  },
}));

export default function App() {
  const classes = useStyles();
  const DrawerLinkStyle = {
    color: "red",
    textDecoration: "none",
  };
  const [token, setToken] = useState("");
  return (
    <Router>
      <AppBar />
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="bottom"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <Button variant="outlined" color="secondary">
              <Link to={"/quest"} style={DrawerLinkStyle}>
                Tableau des quêtes
              </Link>
            </Button>
            <Button variant="outlined" color="secondary">
              <Link to={"/quests"} style={DrawerLinkStyle}>
                Demander de l'aide d'un aventurier
              </Link>
            </Button>
          </List>
        </Drawer>
        <div className={classes.content}>
          <Switch>
            <Route
              path="/login"
              render={() => <Connexion setToken={setToken} />}
            />
            <Route path="/signup" component={Enregistrement} />
            <Route path="/quests" render={() => <AjoutQuete Token={token} />} />
            <Route
              path="/quest"
              render={() => <TableauQuete Token={token} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

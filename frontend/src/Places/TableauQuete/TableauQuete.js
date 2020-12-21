import React /*, { useState }*/ from "react";
//import { makeStyles } from "@material-ui/core/styles";
//import axios from "axios";
import Table from "../../Components/Table";
import Card from "../../Components/Card";
import Grid from "@material-ui/core/Grid";

/*const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));*/

export default function TableauQuete() {
  //const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <h1>Tableau des quêtes</h1>
      <h2>Quêtes complétées</h2>
      <Card />
      <h2>Quêtes non complétées</h2>
      <Table />
    </Grid>
  );
}

/*
L'endroit de visualisation des quêtes comporte 2 sections distinctes: "Quêtes non complétées" et 
"Quêtes complétées". Pour chaque section, on peut voir la liste de quêtes sous la forme de votre choix 
(liste, table, card, etc.).

Les quêtes de chaque section doivent être triées selon le niveau en ordre croissant.
On doit voir le nom et le niveau de chaque quête.
Sur chaque entrée de la liste des quêtes non complétées, on doit avoir un bouton "compléter".
*/

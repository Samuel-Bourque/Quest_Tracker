import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export default function Enregistrement() {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const envoieNom = (e) => {
    setNom(e.target.value);
  };
  const envoieMdp = (e) => {
    setMdp(e.target.value);
  };

  const signup = async () => {
    try {
      const submitHandler = await axios({
        method: "post",
        url: "http://localhost:3000/signup",
        data: {
          name: nom,
          password: mdp,
        },
      });
      console.log(submitHandler.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <h1>Création d'un nouvel aventurier</h1>
      <form noValidate autoComplete="off">
        <Grid container direction="column" justify="center" alignItems="center">
          <h2>Choisir votre nom d'aventurier</h2>
          <TextField
            required
            id="name"
            label="Nom de l'aventurier"
            variant="outlined"
            onChange={envoieNom}
          />
          <br />
          <h2>Entrer votre mot de passe</h2>
          <TextField
            required
            id="mdp"
            label="Mot de passe"
            variant="outlined"
            type="password"
            onChange={envoieMdp}
          />
          <br />
          <Button variant="outlined" color="secondary" onClick={signup}>
            Commencer l'aventure!
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

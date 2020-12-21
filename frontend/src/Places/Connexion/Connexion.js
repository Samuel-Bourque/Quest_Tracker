import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export default function Connexion(props) {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");
  const envoieNom = (e) => {
    setNom(e.target.value);
  };
  const envoieMdp = (e) => {
    setMdp(e.target.value);
  };
  const login = async () => {
    try {
      const loginRequest = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          name: nom,
          password: mdp,
        },
      });
      props.setToken(loginRequest.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <h1>Connexion de l'aventurier</h1>
      <div>
        <form noValidate autoComplete="off">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <h2>Nom de l'aventurier</h2>
            <TextField
              required
              id="name"
              label="Nom de l'aventurier"
              variant="outlined"
              onChange={envoieNom}
            />
            <h2>Mot de passe</h2>
            <TextField
              required
              id="password"
              label="Mot de passe"
              variant="outlined"
              type="password"
              onChange={envoieMdp}
            />
            <br />
            <Button variant="outlined" color="secondary" onClick={login}>
              Connexion
            </Button>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}

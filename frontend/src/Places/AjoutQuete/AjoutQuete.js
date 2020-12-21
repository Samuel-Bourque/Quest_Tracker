import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export default function AjoutQuete(props) {
  const [nom, setNom] = useState("");
  const [lvl, setLvl] = useState("");
  const envoieNom = (e) => {
    setNom(e.target.value);
  };
  const envoieMdp = (e) => {
    setLvl(e.target.value);
  };
  const quests = async () => {
    try {
      const submitHandler = await axios({
        method: "post",
        url: "http://localhost:3000/quests",
        headers: {
          Authorization: "BEARER " + props.Token,
        },
        data: {
          name: nom,
          level: lvl,
        },
      });
      console.log(submitHandler.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <h1>Demander de l'aide en postulant une quête</h1>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <form noValidate autoComplete="off">
          <TextField
            required
            id="name"
            label="Nom de la quête"
            variant="outlined"
            onChange={envoieNom}
          />
          <br />
          <br />
          <TextField
            required
            id="level"
            label="Niveau de la quête"
            variant="outlined"
            type="number"
            onChange={envoieMdp}
          />
          <br />
          <br />
          <Button variant="outlined" color="secondary" onClick={quests}>
            Postuler votre quête
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

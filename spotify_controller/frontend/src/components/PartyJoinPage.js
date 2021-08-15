import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
// export default class PartyJoinPage extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <p>This is the party join component.</p>;
//   }
// }

export const PartyJoinPage = (props) => {
  const [partyCode, setPartyCode] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handlePartyEnter = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-",
      },
      body: JSON.stringify({code: partyCode}),
    };
    //console.log(partyCode);
    fetch ('/api/join-party', requestOptions)
    .then((response) => {
      if (response.ok) {

        history.push(`/party/${partyCode}`)
      } else {
        setError("Party not found.")
        // TODO: clear the input field 
      }
    })
    .catch((error) => {
      console.log(error);
    });
    // console.log(partyCode);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Party Code"
          value={partyCode}
          helperText={error}
          variant="outlined"
          onChange={(event) => setPartyCode(event.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handlePartyEnter} partyCode={partyCode}>
          Enter a Party
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
      <Button variant="contained" color="secondary" to="/" component={Link}>
        Back
      </Button>
      </Grid>
    </Grid>
  );
};

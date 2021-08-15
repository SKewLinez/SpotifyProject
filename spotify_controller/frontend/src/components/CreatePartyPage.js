import React, { useState, useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

//const partyContext = createContext(null);

export const CreatePartyPage = (props) => {
  // const [partyDetails, setPartyDetails] = useState({
  //   partyCode: null,
  //   votesToSkip: 2,
  //   guestCanPause: true,
  //   //update: false,
  //   //updateCallback: () => {},
  // });

  const [update, setUpdate] = useState(false);
  const updateCallback = () => {
  }

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);
  let history = useHistory(); // do not put this inside handlePartySubmit - Invalid hook call

  const handlePartySubmit = async (event) => {
    event.preventDefault();
    let details = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
    };
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    };
    await fetch("/api/create-party", requestOptions)
      .then((response) => response.json())
      .then((data) => history.push("/party/" + data.code));
  };

  function renderCreateButtons() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handlePartySubmit}
          >
            Create a Party
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handlePartySubmit}>
          Update the Party
        </Button>
      </Grid>
    );
  }


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {update ?  "Update the Party" : "Create a Party"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={() => setGuestCanPause((prevCheck) => !prevCheck)}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={(event) => setVotesToSkip(event.target.value)}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handlePartySubmit}>
          Create a Party
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};


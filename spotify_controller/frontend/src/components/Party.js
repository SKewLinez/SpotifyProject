import React, { useState, useEffect, useCallback} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Grid, Button, Typography, TextField} from "@material-ui/core";
import { CreatePartyPage } from "./CreatePartyPage";
import { render } from "react-dom";
// import { Link } from "react-router-dom"

export const Party = ({ leavePartyCallback }) => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  let { partyCode } = useParams();
  //const [partyCodeParam, setPartyCodeData] = useState(pe);
  let history = useHistory();
  //const { partyCode } = this.props.match.params.partyCode;
  //console.log(this.props.match.params.partyCode) // props undefined

  useEffect(() => {
    const partyDetails = async () => {
      console.log("joined: " + partyCode);
      await fetch("/api/get-party" + "?code=" + partyCode)
        .then((response) => {
          if (!response.ok) {
            //TOFIX： does not sync between general user tabs
            console.log("The host has left the party.");
            //props.leavePartyCallback;
            leavePartyCallback();
            console.log("Callback called.");
            history.push("/");
          }
          return response.json();
        })
        .then((data) => {
          setVotesToSkip(data.votes_to_skip),
          setGuestCanPause(data.guest_can_pause),
          setIsHost(data.is_host);
        });
    };
    partyDetails();
  }, []); // every time partyCode updates, call the effect

  const handleLeavePartyPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    await fetch("/api/leave-party", requestOptions).then((response) => {
      leavePartyCallback();
      history.push("/");
    });
  };
  

  function renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(showSettings => !showSettings)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  function renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreatePartyPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            partyCode={partyCode}
            updateCallback={() => {}}
          ></CreatePartyPage>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(showSettings => !showSettings)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (showSettings == true) {
    return renderSettings();
  } else {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Code: {partyCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {isHost.toString()}
          </Typography>
        </Grid>
        {isHost ? renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLeavePartyPressed}
          >
            Leave the Party
          </Button>
        </Grid>
      </Grid>
    );
  }
};

import React, { useState, useEffect } from "react";
import { useParams, useHistory} from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
// import { Link } from "react-router-dom"

export const Party = ({partyCode, leavePartyCallback}) => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);
  //const { partyCode } = useParams();
  let history = useHistory();
  //const { partyCode } = this.props.match.params.partyCode;
  //useEffect(() => {}, [id]);
  //console.log(this.props.match.params.partyCode) // props undefined

  useEffect(() => {
    const partyDetails = async () => {
      console.log("joined: " + partyCode);
      await fetch("/api/get-party" + "?code=" + partyCode)
        .then((response) => {
          //console.log("repsonse: " + response.json());
          if (!response.ok) {
            console.log("The current user has left the party.")
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
  }, [partyCode]); // every time partyCode updates, call the effect


  const handleLeavePartyPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      }
    };
    await fetch('/api/leave-party', requestOptions)
    .then((response) => {

      leavePartyCallback();
  
      history.push("/");
    });
  }

  
  




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
      <Grid item xs={12} align="center">
      <Button variant="contained" color="secondary" onClick={handleLeavePartyPressed}>
        Leave the Party
      </Button>
      </Grid>
    </Grid>
  );
};

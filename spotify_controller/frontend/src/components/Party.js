import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Party = (props) => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);
  const { partyCode } = useParams();
  //const { partyCode } = this.props.match.params.partyCode;
  //useEffect(() => {}, [id]);
  //console.log(this.props.match.params.partyCode) // props undefined

  useEffect(() => {
    const partyDetails = async () => {
      await fetch("/api/get-party" + "?code=" + partyCode)
        .then((response) => response.json())
        .then((data) => {
          setVotesToSkip(data.votes_to_skip),
            setGuestCanPause(data.guest_can_pause),
            setIsHost(data.is_host);
        });
    };
    partyDetails();
  }, []);

  return (
    <div>
      <h3>{partyCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause.toString()}</p>
      <p>Host: {isHost.toString()}</p>
    </div>
  );
};

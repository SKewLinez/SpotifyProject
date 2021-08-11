import React from "react";
import { useParams } from "react-router-dom";

export const PartyJoinPage = (props) => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);
  //const { partyCode } = useParams();
  //const { partyCode } = props.match.params.partyCode;
  //useEffect(() => {}, [id]);
  //console.log(this.props.match.params.partyCode)
  return (
    
    <div>
      {/* <h3>{partyCode}</h3> */}
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause}</p>
      <p>Host: {isHost}</p>
    </div>
  );
};

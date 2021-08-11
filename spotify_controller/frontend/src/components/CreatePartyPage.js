// import React, { Component } from "react";
import React, { useState } from "react";
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

export const CreatePartyPage = (props) => {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);
  let history = useHistory(); // do not put this inside handlePartySubmit - Invalid hook call

  const handlePartySubmit = async (event) => {
    event.preventDefault();
    let details = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
    };
    console.log(details);
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    };
    // let response = await fetch("/api/create-party", requestOptions);
    // let result = response.json();
    // console.log(result);
    await fetch("/api/create-party", requestOptions)
      .then((response) => response.json())
      //.then((data) => console.log(data));
      .then((data) => history.push("/party/" + data.code));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a Party
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

// class CreatePartyPage extends Component {
//   //export default class CreatePartyPage extends Component {
//   defaultVotes = 2;

//   constructor(props) {
//     super(props);
//     this.state = {
//       guestCanPause: true,
//       votesToSkip: this.defaultVotes,
//     };

//     this.handleVotesChange = this.handleVotesChange.bind(this);
//     this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
//     this.handlePartyButtonPressed = this.handlePartyButtonPressed.bind(this);
//   }

//   handleVotesChange(e) {
//     this.setState(
//       {
//         votesToSkip: e.target.value,
//       },
//       () => console.log(this.state.votesToSkip)
//     );
//     // this.setState({
//     //   votesToSkip: e.target.value,
//     // });
//   }

//   handleGuestCanPauseChange(e) {
//     this.setState({
//       guestCanPause: e.target.value === true ? true : false,
//     });
//   }

//   handlePartyButtonPressed() {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         // votes_to_skip: this.state.votesToSkip,

//         guest_can_pause: this.state.guestCanPause,
//         votes_to_skip: this.state.votesToSkip, // BUG: do not update
//       }),
//     };
//     fetch("/api/create-party", requestOptions) // Send the requests to the server without refreshing the page. It is an alternative to the XMLHttpRequest object.
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   }

//   render() {
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <Typography component="h4" variant="h4">
//             Create a Party
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl component="fieldset">
//             <FormHelperText>
//               <div align="center">Guest Control of Playback State</div>
//             </FormHelperText>
//             <RadioGroup
//               row
//               defaultValue="true"
//               onChange={this.handleGuestCanPauseChange}
//             >
//               <FormControlLabel
//                 value="true"
//                 control={<Radio color="primary" />}
//                 label="Play/Pause"
//                 labelPlacement="bottom"
//               />
//               <FormControlLabel
//                 value="false"
//                 control={<Radio color="secondary" />}
//                 label="No Control"
//                 labelPlacement="bottom"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl>
//             <TextField
//               required={true}
//               type="number"
//               onChange={this.handleVotesChange}
//               defaultValue={this.defaultVotes}
//               inputProps={{
//                 min: 1,
//                 style: { textAlign: "center" },
//               }}
//             />
//             <FormHelperText>
//               <div align="center">Votes Required To Skip Song</div>
//             </FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button
//             color="primary"
//             variant="contained"
//             onClick={this.handlePartyButtonPressed}
//           >
//             Create a Party
//           </Button>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="secondary" variant="contained" to="/" component={Link}>
//             Back
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }
// }

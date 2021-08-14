import React, { useState, useEffect } from "react";
// import PartyJoinPage from "./PartyJoinPage";
import { PartyJoinPage } from "./PartyJoinPage";
import { CreatePartyPage } from "./CreatePartyPage";
// import CreatePartyPage from "./CreatePartyPage";
import { Party } from "./Party";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

// export default class HomePage extends Component {
//   constructor(props) {
//     super(props);


// keep this function outside the component, see https://stackoverflow.com/questions/41369296/react-functions-inside-render
function renderHomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          Music Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevatison varaint="contained" color="primary">
          <Button
            color="primary"
            variant="contained"
            to="/join"
            component={Link}
          >
            Join a Party
          </Button>
          <Button
            color="secondary"
            variant="contained"
            to="/create"
            component={Link}
          >
            Create a Party
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
//   }
export const HomePage = () => {
  //let { partyCode } = useParams();
  // render() {
  const [partyCode, setPartyCode] = useState(null);

  useEffect(() => {
    const getUserInParty = async () => {
      await fetch("/api/user-in-party")
      .then((response) => response.json())
      .then((data) => {
        console.log("data:" +  JSON.stringify(data)); // leave -> null
        setPartyCode(data.code);
        console.log("set props party code1:" + partyCode);  // updated 2nd - async 
      });
    };
    getUserInParty();
    console.log("set props party code2:" + partyCode);  // updated 1st
  }, []);

  const clearPartyCode = () => {
    setPartyCode(null);
  }

  return (
    <Router>
      <Switch>
        {/* check if the party already exists before rendering */}
        <Route exact path="/" render={() => {
          return partyCode ? (<Redirect to={`/party/${partyCode}`}></Redirect>) : (renderHomePage());
        }}>
        </Route>
        {/* <Route path="/join" component={PartyJoinPage}></Route> */}
        <Route path="/join">
          <PartyJoinPage />
        </Route>
        {/* <Route path="/create" component={CreatePartyPage}></Route> */}
        <Route path="/create">
          <CreatePartyPage />
        </Route>
        {/* <Route path='/'><p>Hey this is the home page.</p></Route> */}
        <Route path="/party/:partyCode" render={(props) => {
          //return <Party {...props} leavePartyCallback={clearPartyCode}></Party>;
         return <Party partyCode={partyCode} leavePartyCallback={clearPartyCode}></Party>;
        }}>
        </Route>
      </Switch>
    </Router>
  );
  // }
};

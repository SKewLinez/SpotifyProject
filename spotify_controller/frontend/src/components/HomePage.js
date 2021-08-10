import React, { Component } from "react";
import PartyJoinPage from "./PartyJoinPage";
import { CreatePartyPage } from "./CreatePartyPage";
// import CreatePartyPage from "./CreatePartyPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

// export default class HomePage extends Component {
//   constructor(props) {
//     super(props);
//   }
export const HomePage = (props) => {
  // render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>This is the home page.</p>
          </Route>
          <Route path="/join" component={PartyJoinPage}></Route>
          {/* <Route path="/create" component={CreatePartyPage}></Route> */}
          <Route path ="/create"><CreatePartyPage /></Route>
          {/* <Route path='/'><p>Hey this is the home page.</p></Route> */}
        </Switch>
      </Router>
    );
  // }
}

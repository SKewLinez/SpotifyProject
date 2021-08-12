import React, { Component } from "react";
import { render } from "react-dom";
import { HomePage } from "./HomePage";
// import HomePage from "./HomePage";
import PartyJoinPage from "./PartyJoinPage";
import CreatePartyPage from "./CreatePartyPage";

// export default class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {          
//         }
//     }

//     render() {
//         // return <h1>{this.props.name}</h1>
//         return (<div>
//             <HomePage />
//             {/* <PartyJoinPage />
//             <CreatePartyPage /> */}
//             </div>);
//     }
// }
export const App = (props) => {
    return (<div className="center"> <HomePage /> </div>);
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

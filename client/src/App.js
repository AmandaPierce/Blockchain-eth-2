import React, { Component } from "react";
import UniversityDegreeAuthenticator from "./contracts/UniversityDegreeAuthenticator.json";
import getWeb3 from "./utils/getWeb3";
import HomePage from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

class App extends Component {

  
  componentDidMount = async () => {
    try 
    {
      //Get network provider and web3 instance.
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
      UniversityDegreeAuthenticator.abi,"0x5f3c041A724b8196CF65E9060669B761381e46f2");
      this.setState({ web3:web3, account: accounts[0], contract:instance });
    }
    catch(error){
      console.log("error when trying to load web3", error);
  }
};

  constructor(props) {
    super(props);
    this.state = { web3:null, account: '', contract:null};
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      // <h1>{this.state.userType}</h1>
      <HomePage contract={this.state.contract} account={this.state.account} web3={this.state.web3}/>
      // <Router>
      //   <Switch>
      //     <Route path="/university" component={UniversityPage}/>
      //     <Route path="/student" component={StudentPage} />
      //     <Route path="/" component={HomePage} />
      //   </Switch>
      // </Router>
    );
  }
}

export default App;

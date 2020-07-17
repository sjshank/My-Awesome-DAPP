import React from 'react';
import './App.css';
import AddCandidateComponent from "./containers/AddCandidateComponent";
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import VotingComponent from "./Components/VotingComponent";
import { Switch, Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <Switch>
        <Route path="/" exact component={AddCandidateComponent}></Route>
        <Route path="/vote" component={VotingComponent}></Route>
      </Switch>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;

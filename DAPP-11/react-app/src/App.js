import React from 'react';
import './App.css';
import ProofOfExistenceComponent from "./ProofOfExistence";
import DocumentComponent from "./DocumentComponent";
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/document/:docId" component={DocumentComponent}></Route>
        <Route path="/" exact component={ProofOfExistenceComponent}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;

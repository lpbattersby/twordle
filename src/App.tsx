import React from 'react';
import './App.css';
import './components/TwordleGrid/TwordleGrid.css';
import TwordleTile from "./components/TwordleTile/TwordleTile";

function App() {
  return (
    <div className="App">
      <div className="TwordleGrid">
        <TwordleTile letter={"a"} state={"correct-place"}/>
        <TwordleTile state={"incorrect"} letter={"z"}/>
        <TwordleTile disabled={true}/>
        <TwordleTile state={"wrong-place"} letter={"b"}/>
      </div>
    </div>
  );
}

export default App;

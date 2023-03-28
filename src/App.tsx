import React from 'react';
import './App.css';
import TwordleGrid from "./components/TwordleGrid/TwordleGrid";
import TwordleTile from "./components/TwordleTile/TwordleTile";

function App() {
  return (
    <div className="App">
      <TwordleGrid>
        <TwordleTile letter={"a"} state={"correct-place"}/>
        <TwordleTile state={"incorrect"} letter={"z"}/>
        <TwordleTile disabled={true}/>
        <TwordleTile state={"wrong-place"} letter={"b"}/>
      </TwordleGrid>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import Rows from "./components/rows";

const App = () => {
  return (
    <div id="board">

    <div id="title">
     Leaderboard
    </div>
    <Rows />
     
     
    </div>
  
   
    );
}

ReactDOM.render(<App />, document.querySelector('.container'));


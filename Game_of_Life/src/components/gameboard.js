import React from 'react';
import { Component } from 'react';



export default class Gameboard extends Component {

	render(){

		return (
    <div>
  	
  	<div id="upperpad">
    <div id="upperbut">
    <button id="top1">
    Run
    </button>
      <button id="top2">
    Pause
    </button>
        <button id="top3">
    Clear
    </button>
    </div>
    <p id="gen_count">Generation:</p>
    </div>
    <div id="gameboard" >
      
    </div>
    <div id="lowerpad">
    <div>
    <p id="board_sz">Board Size:</p>
    <br />
    <p id="sim_spd"> Sim Speed</p>
    <div id="lowerbuts">
    <button id="bottom1">Size: 50X30</button>
    <button id="bottom2">Size: 70X50</button>
    </div>
    </div>
    </div>
    </div>
	);
	}


}
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
    </div>
    </div>
	);
	}


}
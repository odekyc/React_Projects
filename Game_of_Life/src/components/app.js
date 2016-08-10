import React from 'react';
import { Component } from 'react';

// action functions

function IncreCounter(){

  return{
    type: 'increcounter'

  };
}


//global functions that make empty grid, random grid, advance grid

//dumb components, not involved in dispatching actions and has nothing to do with 
//updating states in redux
const Button=({id, title, handleClick})=>(

    <button id={id} onClick={handleClick}>{title}</button>      

);

const Cell=({newBorn, isAlive, handleClick})=>(
     <div id='cell'></div>
);

const Counter=({genCount})=>(
     
     <p id="gen_count">Generation :  {genCount} </p>
);



class Grid extends Component {

	render(){

		return (
        <div id="grid">
         <Cell />
         </div>
	);
	}

    
}

class Gameboard_ extends Component {

	render(){

		return (
    
         <div id="gameboard" >

           <Grid />
          </div>
	);
	}


}

class Upperpad_ extends Component{

	render(){

      return(

       <div id="upperpad">
    <div id="upperbut">
     <Button id={"top1"} title={"Run"}></Button>
      <Button id={"top2"} title={"Pause"}></Button>
        <Button id={"top3"} title={"Clear"}></Button>
    </div>
     <Counter genCount={900000}></Counter>
    </div>

     );

	};
}

class Lowerpad_ extends Component{

	render(){

      return(
         <div id="lowerpad">
    <div>
    <p id="board_sz">Board Size:</p>
    <br />
    <p id="sim_spd"> Sim Speed</p>
    <div id="lowerbuts">
    <Button id={"bottom1"} title={"Size: 50X30"}></Button>
    <Button id={"bottom2"} title={"Size:70X50"}></Button>
    <Button id={"bottom3"} title={"Size:100X80"}></Button>
    <Button id={"bottom4"} title={"SLOW"}></Button>
    <Button id={"bottom5"} title={"MEDIUM"}></Button>
    <Button id={"bottom6"} title={"FAST"}></Button>
    </div>
    </div>
    </div>
      

     );

	};
}


export default class App extends Component {

	render(){

		return (
    
  	     <div>
  	
  	  <Upperpad_/>
     <Gameboard_/>
     <Lowerpad_/>
    </div>
  	
  
  
    
	);
	}


}
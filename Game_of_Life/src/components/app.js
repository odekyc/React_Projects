import React from 'react';
import { Component } from 'react';


const GridHeight=50;

const GridWidth=70;

// action functions

function IncreCounter(){

  return{
    type: 'increcounter'

  };
}

// reducers

const genCountReducer=(state=0, action)=>{

  switch(action.type){
    case 'increcounter':

      return state+1;

    default:
      return state;
   }
}



//global functions that make empty grid, random grid, advance grid

const EmptyGrid=(height, width)=>{
  let grid=[];
  for(var i=0; i<height; i++){
    var row=[];
    for(var j=0; j<width; j++){
      row.push({
        isAlive: 0,
        newBorn: 0
      });
    }
    grid.push(row);
  }
  return grid;
};


const RandomGrid=(height, width)=>{
  let count=0;
  let grid=[];
  for(var i=0; i<height; i++){
    var row=[];
    for(var j=0; j<width; j++){
      let randomStatus= Math.random() >0.80;
      if(randomStatus){
       count++;
      }
      row.push({
        isAlive: randomStatus,
        newBorn: 0
      });
    }
    grid.push(row);
  }
  return grid;
}



const NextGrid=(currentGrid)=>{
  let grid=[];
  let aliveNeigtbors;
  let neighborCounts=function(x,y){
      

  };

  for(var i=0; i<currentGrid.length; i++){
     var row=[];
     for(var j=0; j<currentGrid[0].length; j++){
        aliveNeigtbors=neighborCounts(i,j);
     }
  }

}



//dumb components, not involved in dispatching actions and has nothing to do with 
//updating states in redux
const Button=({id, title, handleClick})=>(

    <button id={id} onClick={handleClick}>{title}</button>      

);

const Cell=({newBorn, isAlive, handleClick})=>(
     <td className='cell'></td>
);

const Counter=({genCount})=>(
     
     <p id="gen_count">Generation :  {genCount} </p>
);



class Grid extends Component {

	render(){
    let newEmptyGrid=EmptyGrid(50,70);
    var rows=newEmptyGrid.map(function(row, i){
        var entry=row.map(function(element, i){
          return(
            <Cell />
           );
        });
        return(
          <tr>{entry}</tr>
        );
    })

		return (
        <table id="grid">
         <tbody>
            {rows}
         </tbody>
         </table>
	);
	}

    
}

class Gameboard_ extends Component {

	render(){

		return (
         <center>
         <div id="gameboard" >
           
           <Grid />

          </div>
          </center>
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
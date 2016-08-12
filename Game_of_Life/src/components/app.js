import React from 'react';
import { Component } from 'react';

var classNames=require('classnames');

const GridHeight=50;

const GridWidth=70;

const intervalTime=100;

// action functions

function IncreCounter(){

  return{
    type: 'increcounter'

  };
}

function ClearGrid(){
  return{

    type: 'cleargrid'
  };
}

function initRandGrid(){
  return{
    type: 'randomgrid'
  };
}

function getNextGrid(){
  return{
    type: 'nextgrid'
  };
}

function changeSpeed(newInterval){
  return{
    type: 'changespeed',
    payload: newInterval
  };
}

function changeGridSize(newDimension){
  return{
    type:'changegridsize',
    payload: newDimension
  };
}

function returnGrid(){
  return{
    type: 'returngrid'
  };
}

// reducers

const genCountReducer=(state=1, action)=>{

  switch(action.type){
    case 'increcounter':

      return state+1;

    case 'cleargrid':
      
      return 0;

    case 'changespeed':
      
      return 1;

    case 'changegridsize':
      
      return 1;

    default:
      return state;
   }
}


const makeGridReducer=(state=RandomGrid(GridHeight, GridWidth), action) =>{

  switch(action.type){
    case 'cleargrid':
      return EmptyGrid(GridHeight, GridWidth);

    case 'randomgrid':
      
      return RandomGrid(GridHeight, GridWidth);

    case 'nextgrid':

      return NextGrid(state);

    case 'returngrid':

      return state;

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
        isAlive: Number(randomStatus),
        newBorn: 0
      });
    }
    grid.push(row);
  }
  return grid;
}



const NextGrid=(currentGrid)=>{
  let newGrid=[];
  let aliveNeighbors;
  let neighborCounts=function(x,y){
      var neighborsAlive=0;
      var Xminus1=x-1;
      var Yminus1=y-1;
      var Xplus1=x+1;
      var Yplus1=y+1;
      

      if(Xminus1<0){
        Xminus1=GridWidth-1;
      }

      if(Yminus1<0){
        Yminus1=GridHeight-1;
      }

      if(Xplus1===GridWidth){
        Xplus1=0;
      }
     
      if(Yplus1===GridHeight){
        Yplus1=0;
      }
      
      neighborsAlive+=currentGrid[Yminus1][Xminus1].isAlive;
      neighborsAlive+=currentGrid[Yminus1][x].isAlive;
      neighborsAlive+=currentGrid[Yminus1][Xplus1].isAlive;
      neighborsAlive+=currentGrid[y][Xminus1].isAlive;
      neighborsAlive+=currentGrid[y][Xplus1].isAlive;
      neighborsAlive+=currentGrid[Yplus1][Xminus1].isAlive;
      neighborsAlive+=currentGrid[Yplus1][x].isAlive;
      neighborsAlive+=currentGrid[Yplus1][Xplus1].isAlive;


    return neighborsAlive;
     
  };

  for(var i=0; i<currentGrid.length; i++){
     var row=[];
     for(var j=0; j<currentGrid[0].length; j++){
        aliveNeighbors=neighborCounts(i,j);
        if(currentGrid[i][j].isAlive){
          if((aliveNeighbors==2)||(aliveNeighbors==3)){
            row.push({
              isAlive: 1,
              newBorn: 0
            });
          }
          else{
            row.push({
              isAlive: 0,
              newBorn: 0
            });
          }
        }
        else if(!currentGrid[i][j].isAlive){
          if(aliveNeighbors==3){
            row.push({
              isAlive: 1,
              newBorn: 1
            });
          }
          else{
            row.push({
              isAlive: 0,
              newBorn: 0
            });
          }
        }
     }
     newGrid.push(row);
  }

  return newGrid;
}



//dumb components, not involved in dispatching actions and has nothing to do with 
//updating states in redux
const Button=({id, title, handleClick})=>(

    <button id={id} onClick={handleClick}>{title}</button>      

);

const Cell=({newBorn, isAlive, handleClick})=>(

     <td className={classNames({'cell': true, 
      'alive': isAlive,
      'newborn': newBorn,
      'dead': !isAlive && !newBorn})}></td>
);

const Counter=({genCount})=>(
     
     <p id="gen_count">Generation :  {genCount} </p>
);



class Grid extends Component {

	render(){
    let newRandGrid=RandomGrid(50,70);
    var rows=newRandGrid.map(function(row, i){
        var entry=row.map(function(element, i){
          return(
            <Cell newBorn={element.newBorn} isAlive={element.isAlive} />
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
     <Counter genCount={1}></Counter>
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
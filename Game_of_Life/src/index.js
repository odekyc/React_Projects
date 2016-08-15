const { Component } = React;
const { createStore, applyMiddleware } = Redux;
const { Provider } = ReactRedux;
const { connect } = ReactRedux;
const { combineReducers } = Redux;

var classNames=require('classnames');

let GridHeight=50;

let GridWidth=70;

let intervalTime=100;

var actvbottombut="bottom2";
var actvspdbut="bottom4";
var actvstate="top1";
var running=0;
var runInt;

// action functions


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

function changeSpeed(){
  return{
    type: 'changespeed'
  };
}

function changeGridSize(newDimension){
  alert(newDimension);
  return{
    type:'changegridsize',
    payload: newDimension
  };
}

function Run(){
  return{
    type: 'run'
  };
}


function Pause(){
  return{
    type: 'pause'
  };
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
    grid.push(row);
  }

  return grid;
}



const NextGrid=(currentGrid)=>{
  var count=0;
  var aliveNeighbors;
  var neighborCounts=function(x,y){
     let topRow = x-1 < 0 ? (GridHeight - 1) : x-1;
       let bottomRow = (x+1 === GridHeight) ? 0 : x+1;
       let leftColumn = y-1 < 0 ? (GridWidth - 1) : y-1;
       let rightColumn = (y+1 === GridWidth) ? 0 : y+1;

       let total = 0;
       total+= currentGrid[topRow][leftColumn].status;
       total+= currentGrid[topRow][y].status;
       total+= currentGrid[topRow][rightColumn].status;
       total+= currentGrid[x][leftColumn].status;
       total+= currentGrid[x][rightColumn].status;
       total+= currentGrid[bottomRow][leftColumn].status;
       total+= currentGrid[bottomRow][y].status;
       total+= currentGrid[bottomRow][rightColumn].status;

       return total;
  };




   let gameState = [];
     for (let i = 0; i < GridHeight; i++) {
       let row = [];
       for (let j = 0; j < GridWidth; j++) {
         let cellIsAlive = currentGrid[i][j].isAlive;
         let neighbours = neighborCounts(i,j);
           if (cellIsAlive) {
                if (neighbours < 2) {
                    row.push({ isAlive: 0 , newBorn: 0 });
                } else if (neighbours > 3){
                    row.push({ isAlive: 0 , newBorn: 0});
                } else {
                    row.push({ isAlive: 1 , newBorn: 0});
                }
            }
            if (!cellIsAlive) {
                if (neighbours >= 3) {
                row.push({
                  isAlive: 1,
                  newBorn: 1
                });
                count++;
            } else {
                row.push({ isAlive: 0 , newBorn: 0 });
                }
            }
     }
     gameState.push(row);
   }
   
   return gameState;

}



//dumb components, not involved in dispatching actions and has nothing to do with 
//updating states in redux
const Button=({id, title, setClass, handleClick})=>(

    <button id={id} className={setClass} onClick={handleClick}>{title}</button>      

);

const Cell=({newBorn, isAlive, isDead, handleClick})=>(

     <td className={`${ isAlive ? 'alive' : ''} ${newBorn ? 'newborn' : ''}`}></td>
);

const Counter=({genCount})=>(
     
     <p id="gen_count">Generation :  {genCount} </p>
);



class Grid extends Component {

	render(){
    var rows=this.props.grid.map(function(row, i){
        var entry=row.map(function(element, i){
          return(
            <Cell newBorn={element.newBorn} isAlive={element.isAlive} isDead={element.isDead} />
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

  componentDidMount(){
     
  }

	render(){
   
 

    return(
     <div>
       
         <div id="gameboard" >
           <Grid grid={this.props.makeGrid}/>
          </div>
       
     </div>
   );
	}
}

const mapStateToProps=({makeGrid}) =>{
  return { makeGrid }
};

const mapDispatchToProps1=(dispatch) =>{
  return{
    nextGrid: () => dispatch(getNextGrid())
  };
}



const Gameboard= connect(mapStateToProps, mapDispatchToProps1)(Gameboard_);



class Lowerpad_ extends Component{
  

  constructor(){

    super();
   
  }
   
  componentDidMount(){
     this.props.initrandgrid();
     setInterval(this.props.nextGrid, 1000);
  }

	render(){

  
      return(
        <div>
       
         <div id="lowerpad">
    
    <p id="board_sz">Board Size:</p>
    <br />
    <p id="sim_spd"> Sim Speed</p>
    <div id="lowerbuts">
    <Button id={"bottom1"}  setClass={""}  handleClick={ () => this.changeDimSmall() } title={"Size:50X30"}></Button>
    <Button id={"bottom2"} setClass={"activebut"}  handleClick={ () => this.changeDimMed() } title={"Size:70X50"}></Button>
    <Button id={"bottom3"}  setClass={""}  title={"SLOW"} handleClick={ () => this.changeSpd(200, "bottom3") }></Button>
    <Button id={"bottom4"} setClass={"activebut"}  title={"MEDIUM"} handleClick={ () => this.changeSpd(100, "bottom4") }></Button>
    <Button id={"bottom5"}  setClass={""}  title={"FAST"} handleClick={ () => this.changeSpd(40, "bottom5") }></Button>
    </div>
    </div>
    </div>

     );

	};

  changeDimSmall(){
    this.props.changedimension('50X30'); 
     $('td').css("height", "18px");
       $('td').css("width", "18px");
      $('#gameboard').css('width', '960px');
      $('#gameboard').css('height', '630px');
      $('#gameboard').css('left', '240px');
      $('#lowerpad').css('top','670px');
      $('#'+actvbottombut).removeClass('activebut');
      $('#bottom1').addClass('activebut');
      actvbottombut="bottom1";
  }

  changeDimMed(){
      this.props.changedimension('70X50'); 
     $('td').css("height", "15px");
       $('td').css("width", "15px");
      $('#gameboard').css('width', '1110px');
      $('#gameboard').css('height', '840px');
      $('#gameboard').css('left', '165px');
      $('#lowerpad').css('top','880px');
      alert(actvbottombut);
      $('#'+actvbottombut).removeClass('activebut');
      $('#bottom2').addClass('activebut');
      actvbottombut="bottom2";
  }

  changeSpd(newTimeInt, spdButClicked){
    intervalTime=newTimeInt;
    this.props.changespd();
    $('#'+actvspdbut).removeClass('activebut');
    $('#'+spdButClicked).addClass('activebut');
    actvspdbut=spdButClicked;
  }

}

const mapDispatchToProps3=(dispatch) =>{
  return{
    changedimension: (newdim) => dispatch(changeGridSize(newdim)),
    changespd: (newint) => dispatch( changeSpeed(newint)),
    nextGrid: () => dispatch(getNextGrid()),
    initrandgrid: ()=> dispatch(initRandGrid()),
    nextGrid: () => dispatch(getNextGrid())
  };
}


const Lowerpad= connect(null, mapDispatchToProps3)(Lowerpad_);


class Upperpad_ extends Component{

  render(){

      return(

       <div id="upperpad">
    <div id="upperbut">
     <Button id={"top1"} setClass={"activebut"} title={"Run"}></Button>
      <Button id={"top2"}  setClass={""} title={"Pause"}></Button>
        <Button id={"top3"} setClass={""} title={"Clear"}></Button>
    </div>
     <Counter genCount={ this.props.Count }></Counter>
    </div>

     );

  };
}

const mapStateToProps2=({genCount}) =>{
  return { Count: genCount }
};

const mapDispatchToProps2=(dispatch) =>{
  return{
    run: () => dispatch(Run()),
    pause: () => dispatch( Pause()),
    clear: () => dispatch( ClearGrid())
  };
}

const Upperpad= connect(mapStateToProps2, mapDispatchToProps2)(Upperpad_);

const App =()=> (

    
         <div>
    
      <Upperpad />
      <Gameboard />
     <Lowerpad />
    </div>

  );


// reducers

const genCountReducer=(state=1, action)=>{

  switch(action.type){
    case 'nextgrid':

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

const initialGrid=EmptyGrid(GridHeight, GridWidth);

const makeGridReducer=(state=initialGrid, action) =>{

  switch(action.type){
    case 'cleargrid':
      return EmptyGrid(GridHeight, GridWidth);

    case 'randomgrid':
      
      return RandomGrid(GridHeight, GridWidth);

    case 'nextgrid':

      return NextGrid(state.slice(0));

    case 'returngrid':

      return state;

    case 'changespeed':

       return RandomGrid(GridHeight, GridWidth);

    case 'changegridsize':
      let widthHeightArr=action.payload.split('X');
      GridWidth=Number(widthHeightArr[0]);
      GridHeight=Number(widthHeightArr[1]);
     
      return RandomGrid(GridHeight, GridWidth);

    default:
      return state;
  }
}



//combine reducers

const reducers=combineReducers({
  genCount: genCountReducer,
  makeGrid: makeGridReducer,
});


const createStoreWithMiddleware = applyMiddleware()(createStore);



ReactDOM.render( <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>, document.querySelector('.container'));
//Game of Life React + Redux Implementation
//You may prefer to view the source here:  
//https://github.com/thepeted/game-of-life-redux

//CONSTANTS
var GRID_HEIGHT = 50;
var GRID_WIDTH = 70;
var actvbottombut="bottom2";
var actvspdbut="bottom4";
var actvstate="top1";
var running=0;
var runInt;

//REACT & REDUX LIBRARIES SET UP
const { Component } = React;
const { createStore, applyMiddleware } = Redux;
const { Provider } = ReactRedux;
const { connect } = ReactRedux;
const { combineReducers } = Redux;

//HELPERS - generate the gamestate by constructing 2d arrays

const EmptyGrid=(height, width)=>{
  let grid=[];
  for(var i=0; i<height; i++){
    var row=[];
    for(var j=0; j<width; j++){
      row.push({
        status: 0,
        newBorn: 0
      });
    }
    grid.push(row);
  }
  return grid;
};

const RandomGrid=(height, width)=>{
  let grid=[];
  for(var i=0; i<height; i++){
    var row=[];
    for(var j=0; j<width; j++){
      let randomStatus= Math.random() >0.80;
      if(randomStatus){
       row.push({
        status: 1,
        newBorn: 1
      });
      }
      else{
        row.push({
          status: 0,
          newBorn: 0
        });
      }
    }
    grid.push(row);
  }

  return grid;
}

const NextGrid = function(grid){
     let gridHeight = grid.length;
     let gridWidth = grid[0].length;

     let calculateNeighbours = function(x,y) {
       //since the world is toroidal: if the cell is at the edge of the grid we
       //will reference the cell on the opposite edge
       let topRow = x-1 < 0 ? (gridHeight - 1) : x-1;
       let bottomRow = (x+1 === gridHeight) ? 0 : x+1;
       let leftColumn = y-1 < 0 ? (gridWidth - 1) : y-1;
       let rightColumn = (y+1 === gridWidth) ? 0 : y+1;

       let total = 0;
       total+= grid[topRow][leftColumn].status;
       total+= grid[topRow][y].status;
       total+= grid[topRow][rightColumn].status;
       total+= grid[x][leftColumn].status;
       total+= grid[x][rightColumn].status;
       total+= grid[bottomRow][leftColumn].status;
       total+= grid[bottomRow][y].status;
       total+= grid[bottomRow][rightColumn].status;

       return total;
     };
     //apply the rules of the game by comparing with the existing grid to build
     //a new array
     let gameState = [];
     for (let i = 0; i < gridHeight; i++) {
       let row = [];
       for (let j = 0; j < gridWidth; j++) {
         let cellIsAlive = grid[i][j].status;
         let neighbours = calculateNeighbours(i,j);
           if (cellIsAlive) {
                if (neighbours < 2) {
                    row.push({ status: 0, newBorn:0 });
                } else if (neighbours > 3){
                    row.push({ status: 0 , newBorn:0});
                } else {
                    row.push({ status: 1 , newBorn: 0});
                }
            }
            if (!cellIsAlive) {
                if (neighbours === 3) {
                row.push({
                  status: 1,
                  newBorn: 1
                });
            } else {
                row.push({ status: 0 , newBorn:0 });
                }
            }
     }
     gameState.push(row);
   }
   return gameState;
 };


//ACTIONS
function changeSpeed(){
  return{
    type: 'changespeed'
  };
}

function changeGridSize(newDimension){
  return{
    type:'changegridsize',
    payload: newDimension
  };
}

function toggleAlive(x,y) {
  return {
    type: 'TOGGLE_ALIVE',
    x,
    y
  };
}

function initRandGrid() {
  return {
    type: 'randomgrid'
  };
}

function getNextGrid() {
  return {
    type: 'nextgrid'
  };
}

function startPlaying(timerId) {
  return {
    type: 'PLAY',
    timerId
  };
}

function stopPlaying(timerId) {
  return {
    type: 'STOP',
    timerId
  };
}

function clearGrid() {
  return {
    type: 'cleargrid',
  };
}

//COMPONENTS - 'dumb' functional components only receive props.  They don't need to dispatch actions nor to they care about the overall state of the app

const Button=({id, title, setClass, handleClick})=>(

    <button id={id} className={setClass} onClick={handleClick}>{title}</button>      

);

const Cell = ({alive, newBorn, handleClick}) => (
      <td
        onClick={handleClick}
        className={`${alive ? 'alive' : ''} ${newBorn ? 'newborn' : ''}`}
        >
      </td>
);


const Counter=({genCount})=>(
     
     <p id="gen_count">Generation :  {genCount} </p>
);

class Grid extends Component {

  render(){
    var rows=this.props.grid.map(function(row, i){
        var entry=row.map(function(element, i){
          return(
            <Cell newBorn={element.newBorn} alive={element.status} />
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

//CONTAINERS - define a React component and use React-Redux to connect up to the Redux store

class Board_ extends Component {
  render(){
    return (
      <div>
        <div id="gameboard">
        <Grid grid={ this.props.board} />
        </div>
      </div>
    );
  }
}

const mapStateToProps_1 = ({ board }) => {
  return { board } ;
}


const Board = connect(mapStateToProps_1)(Board_);

//

class Upperpad_ extends Component {
  componentDidMount(){
    this.props.initGrid();
    runInt = setInterval(this.props.nextGrid,100);
  }
  render(){
    
      return(

       <div id="upperpad">
    <div id="upperbut">
     <Button id={"top1"} setClass={"button activebut"} title={"Run"}></Button>
      <Button id={"top2"}  setClass={"button "} title={"Pause"}></Button>
        <Button id={"top3"} setClass={"button"} title={"Clear"}></Button>
    </div>
     <Counter genCount={ this.props.Count }></Counter>
    </div>

     );
  }
  // togglePlay(){
  //   if (this.props.playState.isRunning) {
  //     clearInterval(this.props.playState.timerId);
  //     this.props.stopPlaying();
  //   } else {
  //     let interval = setInterval(this.props.nextGrid,100);
  //     this.props.startPlaying(interval);
  //   }
  // }
  // clear(){
  //   if (this.props.playState.isRunning) {
  //     clearInterval(this.props.playState.timerId);
  //     this.props.stopPlaying();
  //   }
  //     this.props.clearGrid();
  // }
}


const mapStateToProps_2 = ({playState, counter}) => {
  return { playState, Count: counter };
}

const mapDispatchToProps_2 = (dispatch) => {
  return {
    initGrid: () => dispatch(initRandGrid()),
    nextGrid: () => dispatch(getNextGrid()),
    startPlaying: (timerId) => dispatch(startPlaying(timerId)),
    stopPlaying: () => dispatch(stopPlaying()),
    clearGrid: () => dispatch(clearGrid())
  };
}

const Upperpad = connect(mapStateToProps_2,mapDispatchToProps_2)(Upperpad_)

//
class Lowerpad_ extends Component{
  

  constructor(){

    super();
   
  }
   

  render(){

  
      return(
        <div>
       
         <div id="lowerpad">
    
    <p id="board_sz">Board Size:</p>
    <br />
    <p id="sim_spd"> Sim Speed</p>
    <div id="lowerbuts">
    <Button id={"bottom1"}  setClass={"button"}  handleClick={ () => this.changeDimSmall() } title={"Size:50X30"}></Button>
    <Button id={"bottom2"} setClass={"button activebut"}  handleClick={ () => this.changeDimMed() } title={"Size:70X50"}></Button>
    <Button id={"bottom3"}  setClass={"button"}  title={"SLOW"} handleClick={ () => this.changeSpd(200, "bottom3") }></Button>
    <Button id={"bottom4"} setClass={"button activebut"}  title={"MEDIUM"} handleClick={ () => this.changeSpd(100, "bottom4") }></Button>
    <Button id={"bottom5"}  setClass={"button"}  title={"FAST"} handleClick={ () => this.changeSpd(40, "bottom5") }></Button>
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
      $('#gameboard').css('width', '1180px');
      $('#gameboard').css('height', '890px');
      $('#gameboard').css('left', '135px');
      $('#lowerpad').css('top','930px');
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

const mapDispatchToProps_3=(dispatch) =>{
  return{
    changedimension: (newdim) => dispatch(changeGridSize(newdim)),
    changespd: () => dispatch( changeSpeed())
  };
}


const Lowerpad= connect(null, mapDispatchToProps_3)(Lowerpad_);



//

const App = () => (
  <div>
    <Upperpad />
    <Board />
    <Lowerpad />
  </div>
)

//REDUCERS

const initialGrid = EmptyGrid(GRID_HEIGHT,GRID_WIDTH);
const boardReducer = (state = initialGrid, action) => {
  switch(action.type){
   

    case 'returngrid':

      return state;

    case 'changespeed':

       return RandomGrid(GridHeight, GridWidth);

    case 'changegridsize':
      let widthHeightArr=action.payload.split('X');
      GRID_WIDTH=Number(widthHeightArr[0]);
      GRID_HEIGHT=Number(widthHeightArr[1]);
     
      return RandomGrid(GRID_HEIGHT, GRID_WIDTH);

    case 'randomgrid':
      //true param requests a random grid from makeGrid method
      return RandomGrid(GRID_HEIGHT,GRID_WIDTH);
    case 'cleargrid':
      return EmptyGrid(GRID_HEIGHT,GRID_WIDTH);
    case 'nextgrid':
      return NextGrid(state.slice(0));
    default:
      return state;
  }
};

const generationCounterReducer = (state = 0, action) => {
  switch(action.type){
    case 'nextgrid':
      return state + 1;
    case 'cleargrid':
      return 0;
    case 'randomgrid':
      return 0;

    case 'changespeed':
      
      return 0;

    case 'changegridsize':
      
      return 0;

    case 'randomgrid':
      
      return 0;
    default:
      return state;
  }
};

const playInitialState = {
  timerId: null,
  isRunning: false
};

const playStatusReducer = (state = playInitialState, action) => {
  switch(action.type){
    case 'PLAY':
      return {
        timerId: action.timerId,
        isRunning: true
      };
    case 'STOP':
      return {
        timerId: null,
        isRuninng: false
      };
    default:
      return state;
  }
};

//COMBINE REDUCERS
const reducers = combineReducers({
  board: boardReducer,
  playState: playStatusReducer,
  counter: generationCounterReducer,
});

//APPLICATION WRAPPER - wrap the app with the redux store and render to the DOM
const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));


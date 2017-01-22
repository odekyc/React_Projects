/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	//Game of Life React + Redux Implementation
	//You may prefer to view the source here: 
	//https://github.com/thepeted/game-of-life-redux

	//CONSTANTS
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GRID_HEIGHT = 50;
	var GRID_WIDTH = 70;
	var interval = 120;
	var actvbottombut = "bottom2";
	var actvspdbut = "bottom4";
	var actvstate = "top1";
	var running = 0;
	var runInt;
	var gridCleared = false;

	//REACT & REDUX LIBRARIES SET UP
	var _React = React;
	var Component = _React.Component;
	var _Redux = Redux;
	var createStore = _Redux.createStore;
	var applyMiddleware = _Redux.applyMiddleware;
	var _ReactRedux = ReactRedux;
	var Provider = _ReactRedux.Provider;
	var _ReactRedux2 = ReactRedux;
	var connect = _ReactRedux2.connect;
	var _Redux2 = Redux;
	var combineReducers = _Redux2.combineReducers;

	//HELPERS - generate the gamestate by constructing 2d arrays

	var EmptyGrid = function EmptyGrid(height, width) {
	  var grid = [];
	  for (var i = 0; i < height; i++) {
	    var row = [];
	    for (var j = 0; j < width; j++) {
	      row.push({
	        isAlive: 0,
	        newBorn: 0
	      });
	    }
	    grid.push(row);
	  }
	  return grid;
	};

	var RandomGrid = function RandomGrid(height, width) {
	  var grid = [];
	  for (var i = 0; i < height; i++) {
	    var row = [];
	    for (var j = 0; j < width; j++) {
	      var randomStatus = Math.random() > 0.80;
	      if (randomStatus) {
	        row.push({
	          isAlive: 1,
	          newBorn: 1
	        });
	      } else {
	        row.push({
	          isAlive: 0,
	          newBorn: 0
	        });
	      }
	    }
	    grid.push(row);
	  }

	  return grid;
	};

	var NextGrid = function NextGrid(grid) {
	  var gridHeight = grid.length;
	  var gridWidth = grid[0].length;

	  var calculateNeighbours = function calculateNeighbours(x, y) {
	    //since the world is toroidal: if the cell is at the edge of the grid we
	    //will reference the cell on the opposite edge
	    var xMinus1 = x - 1;
	    var yMinus1 = y - 1;
	    var xPlus1 = x + 1;
	    var yPlus1 = y + 1;

	    if (xMinus1 < 0) {
	      xMinus1 = gridWidth - 1;
	    }

	    if (yMinus1 < 0) {
	      yMinus1 = gridHeight - 1;
	    }

	    if (xPlus1 == gridWidth) {
	      xPlus1 = 0;
	    }

	    if (yPlus1 == gridHeight) {
	      yPlus1 = 0;
	    }

	    var total = 0;
	    total += grid[yMinus1][xMinus1].isAlive;
	    total += grid[y][xMinus1].isAlive;
	    total += grid[yPlus1][xMinus1].isAlive;
	    total += grid[yMinus1][x].isAlive;
	    total += grid[yPlus1][x].isAlive;
	    total += grid[yMinus1][xPlus1].isAlive;
	    total += grid[y][xPlus1].isAlive;
	    total += grid[yPlus1][xPlus1].isAlive;

	    return total;
	  };
	  //apply the rules of the game by comparing with the existing grid to build
	  //a new array
	  var gameState = [];
	  for (var i = 0; i < gridHeight; i++) {
	    var row = [];
	    for (var j = 0; j < gridWidth; j++) {
	      var cellIsAlive = grid[i][j].isAlive;
	      var neighbours = calculateNeighbours(j, i);
	      if (cellIsAlive) {
	        if (neighbours == 2) {
	          row.push({ isAlive: 1, newBorn: 0 });
	        } else if (neighbours == 3) {
	          row.push({ isAlive: 1, newBorn: 0 });
	        } else {
	          row.push({ isAlive: 0, newBorn: 0 });
	        }
	      }
	      if (!cellIsAlive) {
	        if (neighbours === 3) {
	          row.push({
	            isAlive: 1,
	            newBorn: 1
	          });
	        } else {
	          row.push({ isAlive: 0, newBorn: 0 });
	        }
	      }
	    }
	    gameState.push(row);
	  }
	  return gameState;
	};

	//ACTIONS
	function changeSpeed() {
	  return {
	    type: 'changespeed'
	  };
	}

	function changeGridSize(newDimension) {
	  return {
	    type: 'changegridsize',
	    payload: newDimension
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

	function _clearGrid() {
	  return {
	    type: 'cleargrid'
	  };
	}

	//COMPONENTS - 'dumb' functional components only receive props.  They don't need to dispatch actions nor to they care about the overall state of the app

	var Button = function Button(_ref) {
	  var id = _ref.id;
	  var title = _ref.title;
	  var setClass = _ref.setClass;
	  var handleClick = _ref.handleClick;
	  return React.createElement(
	    "button",
	    { id: id, className: setClass, onClick: handleClick },
	    title
	  );
	};

	var Cell = function Cell(_ref2) {
	  var alive = _ref2.alive;
	  var newBorn = _ref2.newBorn;
	  var handleClick = _ref2.handleClick;
	  return React.createElement("td", {
	    onClick: handleClick,
	    className: (alive ? 'alive' : '') + " " + (newBorn ? 'newborn' : '')
	  });
	};

	var Counter = function Counter(_ref3) {
	  var genCount = _ref3.genCount;
	  return React.createElement(
	    "p",
	    { id: "gen_count" },
	    "Generation :  ",
	    genCount,
	    " "
	  );
	};

	var Grid = (function (_Component) {
	  _inherits(Grid, _Component);

	  function Grid() {
	    _classCallCheck(this, Grid);

	    _get(Object.getPrototypeOf(Grid.prototype), "constructor", this).apply(this, arguments);
	  }

	  //CONTAINERS - define a React component and use React-Redux to connect up to the Redux store

	  _createClass(Grid, [{
	    key: "render",
	    value: function render() {
	      var rows = this.props.grid.map(function (row, i) {
	        var entry = row.map(function (element, i) {
	          return React.createElement(Cell, { newBorn: element.newBorn, alive: element.isAlive });
	        });
	        return React.createElement(
	          "tr",
	          null,
	          entry
	        );
	      });

	      return React.createElement(
	        "table",
	        { id: "grid" },
	        React.createElement(
	          "tbody",
	          null,
	          rows
	        )
	      );
	    }
	  }]);

	  return Grid;
	})(Component);

	var Board_ = (function (_Component2) {
	  _inherits(Board_, _Component2);

	  function Board_() {
	    _classCallCheck(this, Board_);

	    _get(Object.getPrototypeOf(Board_.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Board_, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "div",
	          { id: "gameboard" },
	          React.createElement(Grid, { grid: this.props.board })
	        )
	      );
	    }
	  }]);

	  return Board_;
	})(Component);

	var mapStateToProps_1 = function mapStateToProps_1(_ref4) {
	  var board = _ref4.board;

	  return { board: board };
	};

	var Board = connect(mapStateToProps_1)(Board_);

	//

	var Upperpad_ = (function (_Component3) {
	  _inherits(Upperpad_, _Component3);

	  function Upperpad_() {
	    _classCallCheck(this, Upperpad_);

	    _get(Object.getPrototypeOf(Upperpad_.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Upperpad_, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.props.initGrid();
	      runInt = setInterval(this.props.nextGrid, interval);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this = this;

	      return React.createElement(
	        "div",
	        { id: "upperpad" },
	        React.createElement(
	          "div",
	          { id: "upperbut" },
	          React.createElement(Button, { id: "top1", setClass: "button activebut", handleClick: function () {
	              return _this.Run();
	            }, title: "Run" }),
	          React.createElement(Button, { id: "top2", setClass: "button ", handleClick: function () {
	              return _this.Pause();
	            }, title: "Pause" }),
	          React.createElement(Button, { id: "top3", setClass: "button", handleClick: function () {
	              return _this.Clear();
	            }, title: "Clear" })
	        ),
	        React.createElement(Counter, { genCount: this.props.Count })
	      );
	    }
	  }, {
	    key: "Run",
	    value: function Run() {
	      $('#' + actvstate).removeClass('activebut');
	      $('#top1').addClass('activebut');
	      actvstate = "top1";
	      clearInterval(runInt);
	      if (gridCleared) {
	        this.props.initGrid();
	      }
	      gridCleared = false;
	      runInt = setInterval(this.props.nextGrid, interval);
	    }
	  }, {
	    key: "Pause",
	    value: function Pause() {
	      $('#' + actvstate).removeClass('activebut');
	      $('#top2').addClass('activebut');
	      actvstate = "top2";
	      clearInterval(runInt);
	    }
	  }, {
	    key: "Clear",
	    value: function Clear() {
	      $('#' + actvstate).removeClass('activebut');
	      $('#top3').addClass('activebut');
	      actvstate = "top3";
	      gridCleared = true;
	      clearInterval(runInt);
	      this.props.clearGrid();
	    }
	  }]);

	  return Upperpad_;
	})(Component);

	var mapStateToProps_2 = function mapStateToProps_2(_ref5) {
	  var playState = _ref5.playState;
	  var counter = _ref5.counter;

	  return { playState: playState, Count: counter };
	};

	var mapDispatchToProps_2 = function mapDispatchToProps_2(dispatch) {
	  return {
	    initGrid: function initGrid() {
	      return dispatch(initRandGrid());
	    },
	    nextGrid: function nextGrid() {
	      return dispatch(getNextGrid());
	    },
	    startPlaying: (function (_startPlaying) {
	      function startPlaying(_x) {
	        return _startPlaying.apply(this, arguments);
	      }

	      startPlaying.toString = function () {
	        return _startPlaying.toString();
	      };

	      return startPlaying;
	    })(function (timerId) {
	      return dispatch(startPlaying(timerId));
	    }),
	    stopPlaying: (function (_stopPlaying) {
	      function stopPlaying() {
	        return _stopPlaying.apply(this, arguments);
	      }

	      stopPlaying.toString = function () {
	        return _stopPlaying.toString();
	      };

	      return stopPlaying;
	    })(function () {
	      return dispatch(stopPlaying());
	    }),
	    clearGrid: function clearGrid() {
	      return dispatch(_clearGrid());
	    }
	  };
	};

	var Upperpad = connect(mapStateToProps_2, mapDispatchToProps_2)(Upperpad_);

	//

	var Lowerpad_ = (function (_Component4) {
	  _inherits(Lowerpad_, _Component4);

	  function Lowerpad_() {
	    _classCallCheck(this, Lowerpad_);

	    _get(Object.getPrototypeOf(Lowerpad_.prototype), "constructor", this).call(this);
	  }

	  _createClass(Lowerpad_, [{
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      return React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "div",
	          { id: "lowerpad" },
	          React.createElement(
	            "p",
	            { id: "board_sz" },
	            "Board Size:"
	          ),
	          React.createElement("br", null),
	          React.createElement(
	            "p",
	            { id: "sim_spd" },
	            " Sim Speed"
	          ),
	          React.createElement(
	            "div",
	            { id: "lowerbuts" },
	            React.createElement(Button, { id: "bottom1", setClass: "button", handleClick: function () {
	                return _this2.changeDimSmall();
	              }, title: "Size:50X30" }),
	            React.createElement(Button, { id: "bottom2", setClass: "button activebut", handleClick: function () {
	                return _this2.changeDimMed();
	              }, title: "Size:70X50" }),
	            React.createElement(Button, { id: "bottom3", setClass: "button", title: "SLOW", handleClick: function () {
	                return _this2.changeSpd(200, "bottom3");
	              } }),
	            React.createElement(Button, { id: "bottom4", setClass: "button activebut", title: "MEDIUM", handleClick: function () {
	                return _this2.changeSpd(100, "bottom4");
	              } }),
	            React.createElement(Button, { id: "bottom5", setClass: "button", title: "FAST", handleClick: function () {
	                return _this2.changeSpd(40, "bottom5");
	              } })
	          )
	        )
	      );
	    }
	  }, {
	    key: "changeDimSmall",
	    value: function changeDimSmall() {
	      this.props.changedimension('50X30');
	      $('td').css("height", "18px");
	      $('td').css("width", "18px");
	      $('#gameboard').css('width', '960px');
	      $('#gameboard').css('height', '630px');
	      $('#gameboard').css('left', '240px');
	      $('#lowerpad').css('top', '670px');
	      $('#' + actvbottombut).removeClass('activebut');
	      $('#bottom1').addClass('activebut');
	      actvbottombut = "bottom1";
	    }
	  }, {
	    key: "changeDimMed",
	    value: function changeDimMed() {
	      this.props.changedimension('70X50');
	      $('td').css("height", "15px");
	      $('td').css("width", "15px");
	      $('#gameboard').css('width', '1180px');
	      $('#gameboard').css('height', '890px');
	      $('#gameboard').css('left', '135px');
	      $('#lowerpad').css('top', '930px');
	      $('#' + actvbottombut).removeClass('activebut');
	      $('#bottom2').addClass('activebut');
	      actvbottombut = "bottom2";
	    }
	  }, {
	    key: "changeSpd",
	    value: function changeSpd(newTimeInt, spdButClicked) {
	      $('#' + actvspdbut).removeClass('activebut');
	      $('#' + spdButClicked).addClass('activebut');
	      actvspdbut = spdButClicked;
	      clearInterval(runInt);
	      interval = Number(newTimeInt);
	      runInt = setInterval(this.props.nextGrid, interval);
	    }
	  }]);

	  return Lowerpad_;
	})(Component);

	var mapDispatchToProps_3 = function mapDispatchToProps_3(dispatch) {
	  return {
	    changedimension: function changedimension(newdim) {
	      return dispatch(changeGridSize(newdim));
	    },
	    nextGrid: function nextGrid() {
	      return dispatch(getNextGrid());
	    },
	    changespd: function changespd() {
	      return dispatch(changeSpeed());
	    }
	  };
	};

	var Lowerpad = connect(null, mapDispatchToProps_3)(Lowerpad_);

	//

	var App = function App() {
	  return React.createElement(
	    "div",
	    null,
	    React.createElement(Upperpad, null),
	    React.createElement(Board, null),
	    React.createElement(Lowerpad, null)
	  );
	};

	//REDUCERS

	var initialGrid = EmptyGrid(GRID_HEIGHT, GRID_WIDTH);
	var makeGridReducer = function makeGridReducer(state, action) {
	  if (state === undefined) state = initialGrid;

	  switch (action.type) {

	    case 'returngrid':

	      return state;

	    case 'changegridsize':
	      var widthHeightArr = action.payload.split('X');
	      GRID_WIDTH = Number(widthHeightArr[0]);
	      GRID_HEIGHT = Number(widthHeightArr[1]);

	      return RandomGrid(GRID_HEIGHT, GRID_WIDTH);

	    case 'randomgrid':
	      //true param requests a random grid from makeGrid method
	      return RandomGrid(GRID_HEIGHT, GRID_WIDTH);
	    case 'cleargrid':
	      return EmptyGrid(GRID_HEIGHT, GRID_WIDTH);
	    case 'nextgrid':
	      return NextGrid(state.slice(0));
	    default:
	      return state;
	  }
	};

	var genCounterReducer = function genCounterReducer(state, action) {
	  if (state === undefined) state = 0;

	  switch (action.type) {
	    case 'nextgrid':
	      return state + 1;
	    case 'cleargrid':
	      return 0;
	    case 'randomgrid':
	      return 0;

	    case 'changegridsize':

	      return 0;

	    case 'randomgrid':

	      return 0;
	    default:
	      return state;
	  }
	};

	//COMBINE REDUCERS
	var reducers = combineReducers({
	  board: makeGridReducer,
	  counter: genCounterReducer
	});

	//APPLICATION WRAPPER - wrap the app with the redux store and render to the DOM
	var createStoreWithMiddleware = applyMiddleware()(createStore);

	ReactDOM.render(React.createElement(
	  Provider,
	  { store: createStoreWithMiddleware(reducers) },
	  React.createElement(App, null)
	), document.querySelector('.container'));

/***/ }
/******/ ]);
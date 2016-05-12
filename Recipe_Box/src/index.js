import React from 'react';
import ReactDOM from 'react-dom';
import Dish from './components/dish';
import Button from './components/button';
import IngreBox from './components/ingrebox';


const App = () => {
  return (
  	<div>
  	
  	<IngreBox />
    
    <div id="graybox">
    < Dish />
    <Button />
   
    </div>
   
    </div>
    
    );
}

ReactDOM.render(<App />, document.querySelector('.container'));
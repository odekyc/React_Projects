import React from 'react';
import ReactDOM from 'react-dom';
import Dish from './components/dish';
import Button from './components/button';
import IngreBox from './components/ingrebox';


const App = () => {
  return (
  	<div>
  	
  	<IngreBox />
    <div id="newrecpe">
    <form >
    <br />
         Dish name: <br />
         <br />
       <input type="text" name="dishname"></input> <br />
       <br />
       Ingredients:
       <br />
       (please separate each 
        <br />ingredient by comma)
       <br />
       <br />

       <textarea rows="4" cols="25">
       </textarea>
       <br />
       <br />
        <input type="submit" id="submit"></input>
       </form>
    </div>
    <div id="graybox">
    < Dish />
    <Button />
    
    </div>
    
    </div>
    
    );
}

ReactDOM.render(<App />, document.querySelector('.container'));
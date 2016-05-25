import React from 'react';
import ReactDOM from 'react-dom';
import Dish from './containers/dish';
import Button from './components/button';
import IngreBox from './components/ingrebox';
import Newrec from './components/newRec';

const App = () => {
  

  return (
  	<div>
  	
  	<IngreBox />
    <div id="graybox">
      < Dish />
      <Button />
    
    </div>
   
     <Newrec />
    </div>
    
    );


}

ReactDOM.render(<App />, document.querySelector('.container'));
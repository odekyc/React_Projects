import React from 'react';
import { Component } from 'react';
import Button from './button';
import IngreBox from './ingrebox';
import Newrec from './newRec';

import Dish from '../containers/dish';

export default class App extends Component {

	render(){

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
}
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';


export default class IngreBox extends Component {

      constructor(props){
        super(props);
      }

     render() {
        return (
        <div id="ingredientBox">
  	    <span id="ingre"><center>Ingredients</center></span>
        <div id="circle" onClick={this.hideIngreBox}>
  	    <span id="x"><center>X</center></span>
  	    </div>
         <div id="content">
         <center><span id="recipeName"></span></center>
         <ul id="allingres">
          { this.props.ingredients }
         </ul>
       </div>
         
  	    
  	    <div id="delete"><center>Delete</center></div>
  	    <div id="edit"><center>Edit</center></div>
  	    </div>
    );
  }

 

  hideIngreBox(){
  	$('#ingredientBox').css('visibility', 'hidden');
  	
  	
  }

}



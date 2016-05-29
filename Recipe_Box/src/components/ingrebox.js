import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';




var Content=React.createClass({
    render() {
        return (

        <div>
        <div id="content">
         <center><span id="recipeName"></span></center>
         <Ingres />
       </div>
       </div>
    );
  }

});



var Ingres=React.createClass({
     
 
    

     render(){
       

       return(
         <div >
         <ul id="allingres">
         
         </ul>
         </div>
        );
       
     }

});



export default class IngreBox extends Component {

     render() {
        return (
        <div id="ingredientBox">
  	    <span id="ingre"><center>Ingredients</center></span>
        <div id="circle" onClick={this.hideIngreBox}>
  	    <span id="x"><center>X</center></span>
  	    </div>

         <Content />
  	    
  	    <div id="delete"><center>Delete</center></div>
  	    <div id="edit"><center>Edit</center></div>
  	    </div>
    );
  }

 

  hideIngreBox(){
  	$('#ingredientBox').css('visibility', 'hidden');
  	
  	
  }

}



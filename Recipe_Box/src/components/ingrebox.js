import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';



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


class IngreBox extends Component {

     constructor(){
      super();

      this.deleteDish=this.deleteDish.bind(this);
     }

     render() {
        return (
        <div id="ingredientBox">
  	    <span id="ingre"><center>Ingredients</center></span>
        <div id="circle" onClick={this.hideIngreBox}>
  	    <span id="x"><center>X</center></span>
  	    </div>

         <Content />
  	    
  	    <div id="delete" onClick={this.deleteDish}><center>Delete</center></div>
  	    <div id="edit"><center>Edit</center></div>
  	    </div>
    );
  }

 

  hideIngreBox(){
  	$('#ingredientBox').css('visibility', 'hidden');
  	
  	
  }

  deleteDish(){
    alert('delete dish');
    let curdish=this.props.myactived;
    alert(curdish.dish);
    
  }
}


function mapStateToProps(state){
     
     return{
        myactived: state.activedish,
       
     };
  
}


export default connect(mapStateToProps)(IngreBox);




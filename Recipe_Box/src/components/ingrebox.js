import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { deleteState } from '../Actions/index';
import { bindActionCreators } from 'redux';


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
    alert("curdish"+curdish.dish);

    let grayboxheight=$('#graybox').height();
     

    this.props.deleteState(curdish);

    $('#graybox').css('height', grayboxheight-57);

    $('#ingredientBox').css('visibility', 'hidden');
  }
}


function mapStateToProps(state){
     
     return{
        mydishes: state.mydish,
        myactived: state.activedish,
       
     };
  
}

function mapDispatchToProps(dispatch){



  return bindActionCreators({ deleteState: deleteState}, dispatch);

}



export default connect(mapStateToProps, mapDispatchToProps)(IngreBox);




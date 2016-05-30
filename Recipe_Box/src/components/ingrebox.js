import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { deleteState } from '../Actions/index';
import { bindActionCreators } from 'redux';
import Editingre from './updateingre';

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
      this.openEditBox=this.openEditBox.bind(this);
     }

     render() {
        return (
          <div>
        <div id="ingredientBox">
  	    <span id="ingre"><center>Ingredients</center></span>
        <div id="circle" onClick={this.hideIngreBox}>
  	    <span id="x"><center>X</center></span>
  	    </div>

         <Content />
  	    
  	    <div id="delete" onClick={this.deleteDish}><center>Delete</center></div>
  	    <div id="edit" onClick={this.openEditBox}><center>Edit</center></div>

  	    </div>

        <Editingre />
        </ div>
    );
  }

 

  hideIngreBox(){
  	$('#ingredientBox').css('visibility', 'hidden');
  	
  	
  }

  openEditBox(){ 
    alert("editbox opened");


 

    $('#editbox').css('visibility', 'visible');

  }

  deleteDish(){
   
    let curdish=this.props.myactived[0];
   

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




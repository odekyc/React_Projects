import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addState } from '../Actions/index';
import { bindActionCreators } from 'redux';

class Newrec extends Component {
     
     constructor(){
      super();

  
 
      this.submitForm=this.submitForm.bind(this);
      this.hide=this.hide.bind(this);
     
     }

   


     render() {
        

        return (
        <div>
      
         <div id="newrecpe">
        
    <form onSubmit={this.submitForm}>
     <div id="addingreX" onClick={ this.hide}>
         <center>
         <p> X </p>
         </center>
         </div>
    <br />
         Dish name: <br /> 
         <br />
       <input type="text" id="dishname" > </input><br />
       <br />
       Ingredients:
       <br />
       (please separate each 
        <br />ingredient by comma)
       <br />
       <br />

       <textarea id="addnewtextA" rows="4" cols="25">
      
       </textarea>
       <br />
       <br />
        <input type="submit" id="submit"></input>
       </form>
    </div>
    </div>
    );
  }     

     hide(){

         $('#newrecpe').css('visibility', 'hidden');
      }
 

  submitForm(event){
    
  

    let dishname=$('#dishname').val();
  
   

    let ingredients=$('#addnewtextA').val();


    if (( dishname==='')||(ingredients==='')){
     
      event.preventDefault();
    }
    else{

      dishname=dishname.replace(/ /g, "_");

     let res=ingredients.split(',');
  

    event.preventDefault();

    let box_height=$('#graybox').height();

    this.props.addState({dish: dishname, in:res});
 


   $('#newrecpe').css('visibility', 'hidden');

   $('#graybox').css('height', box_height+66);
  
   }
    
  }

    


}


function mapStateToProps(state){
     
     return{
        mydishes: state.mydish

     };
  
}

function mapDispatchToProps(dispatch){



  return bindActionCreators({ addState: addState}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Newrec);




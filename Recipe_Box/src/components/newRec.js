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
     

     }

     render() {


        return (
        <div>
      
         <div id="newrecpe">
    <form onSubmit={this.submitForm}>
    <br />
         Dish name: <br /> 
         <br />
       <input type="text" id="dishname"></input><br />
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
    </div>
    );
  }     



  submitForm(event){


    let dishname=$('#dishname').val();
  
    let ingredients=$('textarea').val();

    if (( dishname==='')&&(ingredients==='')){
      alert("you didn't enter a valid selection.");
      event.preventDefault();
    }
    else{

     let res=ingredients.split(',');
  

    event.preventDefault();

    let box_height=$('#graybox').height();

    alert(box_height);

    

    this.props.addState({dish: dishname, in:res});
 


   $('#newrecpe').css('visibility', 'hidden');

   $('#graybox').css('height', box_height+66);
  
   }
    
  }

    


}


function mapStateToProps(state){
     
     return{
        mydishes: state.mydish,
        myingres: state.myingre

     };
  
}

function mapDispatchToProps(dispatch){



  return bindActionCreators({ addState: addState}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Newrec);




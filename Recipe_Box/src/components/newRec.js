import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';



export default class Newrec extends Component {
     
 

     render() {


        return (
        <div>
      
         <div id="newrecpe">
    <form onSubmit={this.submitForm}>
    <br />
         Dish name: <br />
         <br />
       <input type="text" id="dishname"></input> <br />
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

  submitForm(){
    document.getElementById("submit").addEventListener("click", function(){

      $("Dish").attr("dishes","{['meow']}");
    });
    var dishname=$('#dishname').val();
    alert(dishname);
    var ingredients=$('textarea').val();

    var res=ingredients.split(",");
    
    alert(dishname);


  
  }
    


}




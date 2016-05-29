import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import IngreBox from '../components/ingrebox';

class Dish extends Component {

  
      render() {
       
        alert("rendered")

      return(
           
           <div id='box'> 
           
           {this.props.mydishes.map((curdish) => {
           return(
            [
            <div className='dishes' id={curdish.dish} onClick={ () => this.openIngredientBox (event, curdish) }>{curdish.dish}</div>,
            <IngreBox />
           ]
           );
            })}

           </div>
          
      );

          

      
 
  }         

     openIngredientBox (e, mydish){
       
      

        $('#ingredientBox').css('visibility', 'visible');

        var current_dish=mydish.dish;
       document.getElementById("recipeName").innerHTML = current_dish;

       var dishname=current_dish;

       document.getElementById("allingres").innerHTML=mydish.in;
    
      
     }

     deleteDish(){
        var dish_delete=document.getElementById(current_dish);

     }

}

function mapStateToProps(state){
     
     return{
        mydishes: state.mydish,
        myactivedish: state.activedish
     };
  
}

export default connect(mapStateToProps)(Dish);

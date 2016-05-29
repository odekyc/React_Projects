import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import IngreBox from '../components/ingrebox';
import { selectDish } from '../Actions/index';
import { bindActionCreators } from 'redux';

class Dish extends Component {

      constructor(){
       super();

       this.openIngredientBox=this.openIngredientBox.bind(this);

      }
  
      render() {
       
        alert(" dish rendered")

      return(
           
           <div id='box'> 
           
           {this.props.mydishes.map((curdish) => {
           return(
            [
            <div className='dishes' id={curdish.dish} onClick={ () => this.openIngredientBox (curdish) }>{curdish.dish.replace(/_/g, " ")}</div>,
            <IngreBox />
           ]
           );
            })}

           </div>
          
      );

          

      
 
  }         

     openIngredientBox ( mydish){
       
      

        $('#ingredientBox').css('visibility', 'visible');

        var current_dish=mydish.dish;
       document.getElementById("recipeName").innerHTML = current_dish.replace(/_/gi, ' ');

       var dishname=current_dish;

       document.getElementById("allingres").innerHTML=mydish.in;
       
       this.props.selectDish(mydish);
       
    
      
     }



}

function mapStateToProps(state){
     
     return{
        mydishes: state.mydish,
       
     };
  
}

function mapDispatchToProps(dispatch){



  return bindActionCreators({ selectDish: selectDish}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Dish);

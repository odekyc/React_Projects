import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class Dish extends Component {

     componentDidMount(){
      alert("didmount");
     }

      render() {
       
        alert("rendered");

      return(
           <div id='box'> 
           {this.props.mydishes.map((curdish) => <div className='dishes'
            id={curdish.dish} onClick={this.openIngredientBox}>{curdish.dish}</div>)}
           </div>

      );

          

      
 
  }         

     openIngredientBox (e){
       

        $('#ingredientBox').css('visibility', 'visible');

        var current_dish=e.target.id;
       document.getElementById("recipeName").innerHTML = current_dish;

       var dishname=current_dish;

       if(dishname==="Spaghetti"){
         document.getElementById("allingres").innerHTML = "<li>Noodles</li><li>Tomato Sauce</li><li>(Optional) Meatballs</li>";
       }
       else if(dishname==="Onion Pie") {
        document.getElementById("allingres").innerHTML = "<li>Onion</li><li>Pie Crust</li>";
       }
      
     }

     deleteDish(){
        var dish_delete=document.getElementById(current_dish);

     }

}

function mapStateToProps(state){
     
     return{
        mydishes: state.mydish

     };
  
}

export default connect(mapStateToProps)(Dish);

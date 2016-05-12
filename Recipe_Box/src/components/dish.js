import React from 'react';
import { Component } from 'react';

export default class Dish extends Component {
     
  

     render() {
        return (
        
        <div>

        <div className="dishes" id="Spaghetti" onClick={this.openIngredientBox} >
        Spaghetti
        </div>
        
        <div className="dishes" id="Onion Pie" onClick={this.openIngredientBox} >
        Onion Pie
        </div>
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
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';



export default class Dish extends Component {
  
  constructor(props) {
    super(props);
    this.state = { /* initial state */
      dishes: props.dishes
     };
  }

   componentWillMount(){
    alert("Componentwillmount");
   }
 
    componentDidMount(){
      alert("ComponentDidmount");
    }
  
    componentWillReceiveProps(next){
      alert("will receive props")
    }
   

      render() {
        alert("rendered dishes");

        return(
           <div id='box'> 
           {this.state.dishes.map((dish) => <div className='dishes'
            id={dish} onClick={this.openIngredientBox}>{dish}</div>)}
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

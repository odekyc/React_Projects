import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import IngreBox from '../components/ingrebox';

class Dish extends Component {

  
      render() {
       
        alert("rendered");

      return(
           
           <div id='box'> 
           <IngreBox />
           {this.props.mydishes.map((curdish) => <div className='dishes'
            id={curdish.dish} onClick={this.openIngredientBox}>{curdish.dish}</div>)}
           </div>

      );

          

      
 
  }         

     openIngredientBox (e){
       
        let ingrestr='';

        let dishname1=$('#dishname').val();

        alert(dishname1);

        $('#ingredientBox').css('visibility', 'visible');

        var current_dish=e.target.id;
       document.getElementById("recipeName").innerHTML = current_dish;

       var dishname=current_dish;

       if(dishname==="Spaghetti"){
         alert(this.props.myingres[0].in);
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
        mydishes: state.mydish,
        myactivedish: state.activedish
     };
  
}

export default connect(mapStateToProps)(Dish);
